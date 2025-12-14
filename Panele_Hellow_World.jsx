/*
<javascriptresource>
<name>Hello World</name>
</javascriptresource>
*/

/*-----------------------------------------
    CPaletteWindowをつかって、”Hlloe world”
-------------------------------------------*/

/*
 CPaletteWindowを基底クラスとして作成しました。
 ここでは、CHellowWorldDlgに継承させて、ボタンがひとつだけのダイアログを表示して、
 このボタンを押すことで、Hellow Worldと表示して終わります。

 ボタンが押されたが押された後の処理はおおまかには、下記のようになっています。
   ボタンが押された　→　onClick　→　CallFuncでBridgeTalkを使用してHelloWorld2を呼ぶ　→　HelloWorldを呼ぶ
*/

// Ver.1.0 : 2025/12/14


#target illustrator
#targetengine "main"


SELF = (function(){
    try {app.documents.test()}
    catch(e) {return File(e.fileName)}
})();

// 外部のJSXを読み込む
$.evalFile(SELF.path + "/ZazLib/" + "PaletteWindow.jsx");


//-----------------------------------
// クラス CHellowWorldDlg
//-----------------------------------

    // コンストラクタ (ここから) 
    function CHellowWorldDlg( DlgName, InstanceName ) { 
       
        // 初期化
        const TheMainObj = this;
        CPaletteWindow.call( TheMainObj );          // コンストラクタ
        TheMainObj.InitDialog( DlgName );           // イニシャライザ
        const TheMainDlg = TheMainObj.GetDlg();     // ダイアログへのオブジェクトを得る

        // ダイアログにボタン追加
        myButton = TheMainObj.AddButton("Push");
        myButton.onClick = function() {
            try {
                TheMainObj.CallFunc( InstanceName, "HelloWorld2" );
            }
            catch(e) {
                alert( e.message );
            } 
        }

    } // コンストラクタ (ここまで) 
    
    // ・サブクラスのメソッド追加よりも先に、プロトタイプチェーンで継承させること。
    // ・追加したメソッドが継承元のメソッド名と同じ場合は、上書きになるので注意すること。
    CHellowWorldDlg.prototype = CPaletteWindow.prototype;
    
    // 追加したいソッドをここで定義
    CHellowWorldDlg.prototype.HelloWorld = function() {
        alert("Hellow world");
    }
    
    // 追加したいメソッドをここで定義
    CHellowWorldDlg.prototype.HelloWorld2 = function() {
        const TheObj = this;
        TheObj.HelloWorld();
        TheObj.CloseDlg();
    }
 

//インスタンスを生成。なお、CHellowWorldDlgの引数にも、インスタンス名(DlgPaint)を記入のこと！！
var DlgPaint = new CHellowWorldDlg( "test", "DlgPaint" );


main();

function main()
{    
    // バージョン・チェック
    if( appVersion()[0]  >= 24)
    {
        DlgPaint.ShowDlg();
    }
    else
    {
         var msg = {en : 'This script requires Illustrator 2020.', ja : 'このスクリプトは Illustrator 2020以降に対応しています。'} ;
        alert(msg) ; 
     }
}
