my grammar Rules {
	rule TOP { <typeandname> <namedvaluelist>? <initialvalue>? <visibility>? }
	rule typeandname { <type> 'named' <name> }
	token type { text | dropdown | radio | button }
	token name { \w+ }
	rule namedvaluelist { 'values'\s?<valuelist> }
	rule valuelist { <value> | <value>','<valuelist> }
	token value { \w+ }
	token initialvalue { 'initial value'\s?\w+ }
	rule visibility { 'if' }
}

my $output = "
<html>"
~'<style>input{width: 35%; margin: auto;}select{width: 35%; margin: auto;}</style>'~
"<body>";

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

		$output ~= "<p>{$outputparser.getValue('name')}</p>" if $outputparser.getValue('name');

		$output ~= "<input><br>" if $outputparser.getValue('type') eq 'text';

		if $outputparser.getValue('type') eq 'dropdown' {
    	$output ~= "<select name=\"{$outputparser.getValue('name')}\">";
 			for |$outputparser.getValue('values') -> $value {
 				$output ~= "<option value=\"{$value}\">{$value}</option>"
 			}					
  		
  		$output ~= "</select><br>";
		}

		$output ~="<button>{$outputparser.getValue('name')}</button>" if $outputparser.getValue('type') eq 'button';				
	}

	"output.html".IO.spurt: $output ~ '</body>';
} 

