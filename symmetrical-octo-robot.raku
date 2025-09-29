my grammar Rules {
	rule TOP { (<typeandname> <namedvaluelist>? <initialvalue>? <visibility>?) | 'information'\s?<information> | 'image' <imagefilename> }
	rule typeandname { <type> 'named' <name> }
	token type { text | dropdown | radio | button | date }
	token name { \w+ }
	rule namedvaluelist { 'values'\s?<valuelist> }
	rule valuelist { <value> | <value>','<valuelist> }
	token value { \w+ }
	token initialvalue { 'initial value'\s?\w+ }
	rule visibility { 'if' }
	rule information { .* }
	rule imagefilename { .* }
}

my $output = "<html>"
~'<style>input{width: 100%;}div{width: 35%;margin: auto;}select{width: 100%;}button{width: 100%;}</style>'~
"<body><div>\n";

class OutputParser {

	has %facts = Map.new;
    
    method type ($type) { 
    	%facts{'type'} = $type.trim();
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
			$output ~="<image src='{$outputparser.getValue('imagefilename')}'></image>\n"	
		}

		$output ~="<p>{$outputparser.getValue('information')}</p>\n" if $outputparser.getValue('information');				
	}

	"output.html".IO.spurt: $output ~ '</div></body>';
} 

sub add_input_of_type($outputparser) {
	with $outputparser.getValue('type') {
		$output ~= "<p>{$outputparser.getValue('name')}</p>\n" if $outputparser.getValue('name'); #title
		$output ~= "<input><br>\n" if $outputparser.getValue('type') eq 'text';

		if $outputparser.getValue('type') eq 'dropdown' {
    	$output ~= "<select name=\"{$outputparser.getValue('name')}\">";
 			for |$outputparser.getValue('values') -> $value {
 				$output ~= "<option value=\"{$value}\">{$value}</option>\n"
 			}					
  		
  		$output ~= "</select><br>\n";
		}

		$output ~="<button>{$outputparser.getValue('name')}</button>\n" if $outputparser.getValue('type') eq 'button';

		$output ~= "<input type='date'><br>\n" if $outputparser.getValue('type') eq 'date';
	}
}
