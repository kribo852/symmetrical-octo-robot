my grammar Rules {
	rule TOP { <typeandname> <valuelist>? <initialvalue>? <visibility>? }
	rule typeandname { <type> 'named' <name> }
	token type { text | dropdown | radio }
	token name { \w+ }
	rule valuelist { \w+ | \w+','<valuelist> }
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

    method getValue($key) {
    	return %facts{$key};
    }
} 


sub MAIN() {

	my $prototypespec = "text named Hello\ntext named Goodby\ntext named Raku\ndropdown named Car\ntext named Nonsense";

	my @splitlist = $prototypespec.split("\n");
	for @splitlist -> $line {
		my OutputParser $outputparser = OutputParser.new;
 
		Rules.parse($line, actions => $outputparser);

		$output ~= "<p>{$outputparser.getValue('name')}</p>" if $outputparser.getValue('name');

		$output ~= "<input><br>" if $outputparser.getValue('type') eq 'text';

    	$output ~= "<select name=\"cars\" id=\"cars\">
  					<option value=\"volvo\">Volvo</option>
  					<option value=\"saab\">Saab</option>
  					<option value=\"mercedes\">Mercedes</option>
  					<option value=\"Audi\">Hej</option>
					</select><br>" if $outputparser.getValue('type') eq 'dropdown';	
	}

	"output.html".IO.spurt: $output ~ '</body>';
} 

