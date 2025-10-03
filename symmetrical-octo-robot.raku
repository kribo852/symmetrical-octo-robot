my grammar Rules {
	rule TOP { <button> | (<typeandname> <namedvaluelist>?) | 'information named'\s?<name>\s?<information> | 'image named'\s?<name>\s?<imagefilename> }
	rule typeandname { <type> 'named' <name> }
	token type { text | dropdown | radio | date }
	rule button { 'button named'\s?<name>\s?<toggle>? }
	token name { \w+ }
	rule namedvaluelist { 'values'\s?<valuelist> }
	rule valuelist { <value> | <value>','<valuelist> }
	token value { \w+ }
	token information { .* }
	token imagefilename { .* }
	rule toggle {'toggle'\s?<toggle_name> }
	token toggle_name { \w+ }
}

constant $stylesheet = '<style>input{width: 100%;}.checkbox{width: auto;}.main{width: 45%;margin: auto;}select{width: 100%;}button{width: 100%;}p.forinput{margin-bottom:3px;}img{margin-top: 5px;margin-bottom: 5px;width: 100%;}</style>';

my $output = "<html><style></style><body><div class='main'>\n";

my $accumulated_scripts = "";

class OutputParser {

	has %facts = Map.new;
    
    method type ($type) { 
    	%facts{'type'} = $type.trim();
    }

    method button($ignore) {
    	%facts{'type'} = 'button';
    }

    method name ($name) { 
    	%facts{'name'} = $name.trim();
    }

    method value ($value) {
    	unless %facts{'values'} {
    		%facts{'values'} = Array.new;
    	} 
    	%facts{'values'}.push($value);
    }

    method information($information) {
    	%facts{'information'} = $information;
    }

    method imagefilename($imagefilename) {
    	%facts{'imagefilename'} = $imagefilename;
    }

    method toggle_name($element_hide_name) {
    	say $element_hide_name;
    	%facts{'toggle_name'} = $element_hide_name;
    }

    method getValue($key) {
    	return %facts{$key};
    }
} 


sub MAIN($input_filename) {

	my $prototypespec = $input_filename.IO.slurp();

	my @splitlist = $prototypespec.split("\n");
	for @splitlist -> $line {
		my OutputParser $outputparser = OutputParser.new;
 
		Rules.parse($line, actions => $outputparser);

		add_input_of_type($outputparser);

		with $outputparser.getValue('imagefilename') {
			$output ~="<img id='{$outputparser.getValue('name')}' src='{$outputparser.getValue('imagefilename')}'></img>\n"	
		}

		$output ~="<p id='{$outputparser.getValue('name')}'>{$outputparser.getValue('information')}</p>\n" if $outputparser.getValue('information');				
	}
	$output ~= '</div></body>';
	$output ~= '<script>' ~ $accumulated_scripts ~ '</script>';
	replace_style($stylesheet);

	"output.html".IO.spurt: $output;
} 

sub add_input_of_type($outputparser) {
	with $outputparser.getValue('type') {
		$output ~= "<div id='{$outputparser.getValue('name')}'><p class='forinput'>{$outputparser.getValue('name')}</p>\n" if $outputparser.getValue('name'); #title
		$output ~= "<input>" if $outputparser.getValue('type') eq 'text';

		if $outputparser.getValue('type') eq 'dropdown' {
    	$output ~= "<select name=\"{$outputparser.getValue('name')}\">";
 			for |$outputparser.getValue('values') -> $value {
 				$output ~= "<option value=\"{$value}\">{$value}</option>\n"
 			}					
  		
  		$output ~= "</select>";
		}

		if $outputparser.getValue('type') eq 'button' {
			with $outputparser.getValue('toggle_name') {
				my $toggle_function_name = 'toggle' ~ $outputparser.getValue('name');	

				$output ~="<button onclick='{$toggle_function_name}()'>{$outputparser.getValue('name')}</button>" if $outputparser.getValue('type') eq 'button';	

				$accumulated_scripts ~= make_toggle_function($toggle_function_name, $outputparser.getValue('toggle_name'));
			} 
			without $outputparser.getValue('toggle_name') {
				$output ~="<button>{$outputparser.getValue('name')}</button>" if $outputparser.getValue('type') eq 'button';
			}
		}


		$output ~= "<input type='date'>" if $outputparser.getValue('type') eq 'date';

		add_radios($outputparser.getValue('name'), $outputparser.getValue('values')) if $outputparser.getValue('type') eq 'radio';

		$output ~= "</div>\n"
	}
}

sub add_radios($input_name, @options) {
	for @options -> $button_value {
 		$output ~= "<input type='radio' id='{$button_value}' name='{$input_name}' value='{$button_value}' class='checkbox'>";
		$output ~= "<label for='{$button_value}'>{$button_value}</label>\n";
 	}	
}

sub make_toggle_function($function_name, $element_hide_name) {
	return '
	function '~$function_name~'() { var x = document.getElementById("'~$element_hide_name~'");
  		if (x.style.display === "none") {
    		x.style.display = "block";
  		} else {
    		x.style.display = "none";
		}
	}
';
}


sub replace_style($replacement) {
	my Match $match = $output.match("<style></style>");
	$output = $match.replace-with("\n" ~ $replacement ~ "\n");
}


