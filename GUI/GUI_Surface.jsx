var Dlg = new Window("dialog"); 
    Dlg.text = "Dialog"; 
    Dlg.orientation = "column"; 
    Dlg.alignChildren = ["center","top"]; 
    Dlg.spacing = 10; 
    Dlg.margins = 16; 

var button1 = Dlg.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "Push this button"; 
