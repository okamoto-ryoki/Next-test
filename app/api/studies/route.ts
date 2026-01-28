import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const dataFilePath = path.join(process.cwd(), "src/data.json"); //このファイルからデータベースへのパス

export async function GET() {
    try {
        if (fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath, "utf8"); //データベースを読める形で取り出す
            const data = JSON.parse(fileContent); //jsにする
            return NextResponse.json(data); // 返答する
        } else {
            // ファイルがないなら、「空っぽの配列」を返す（エラーを出してはいけない）
            return NextResponse.json([]); 
        }

    } catch(error) {
        return NextResponse.json({error: "失敗" }, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json(); //新規のデータをとってきて、（request.json() → JSONではなく）JSにする

        let currentData = [];
        if(fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath, "utf8") //データベースを読める形で取り出す
            if(fileContent) {
                currentData = JSON.parse(fileContent); // 既存のデータをJSにする
            }
        }

        const newData = [...currentData, body]; //　JSで統合する

        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2)); // 

        return NextResponse.json({message: "OK"});
    } catch(error) {
        return NextResponse.json({error: "失敗" }, {status: 500});
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json(); // idを取得

        let currentData = [];
        if(fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath, "utf8"); //データベースを読める形で取り出す
            currentData = JSON.parse(fileContent); // 既存のデータをJSにする
        }

        const newData = currentData.filter((item: any) => item.id !== id); // 送られてきたIDと一致しないデータだけを残す

        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2)); // null: フィルターなし、 2: インデントのスペース数

        return NextResponse.json({ message: "削除しました" });

    } catch(error) {
        return NextResponse.json({ error: "削除失敗"}, { status: 500 });
    }
}
// fs.writeFileSync (書く)                     ➡ ( 場所, 中身 )
// fs.readFileSync (読む)                      ➡ ( 場所, "utf8" )
// fs.existsSync (確認) / fs.unlinkSync (削除)  ➡ ( 場所 )

{/*
    取得機能 (GET)
【確認】 ファイルがあるか確認する/なければ「空っぽ」を返して終了
【出す】 あれば、ファイルを読み込む
【翻訳】 文字列をJSオブジェクトにする（JSON.parse）
【返事】 データを渡す
*/}

{/*
    入力機能 (POST)
【受け取る】 新しいデータを受け取ってJSにする（request.json）
【出す】 過去データを読み込んでJSにする
【混ぜる】 過去データと新データを合体させる（[...]）
【戻す】 合体したデータを整形して、ファイルに上書き保存する
【返事】 OKと答える
*/}

{/*
    削除機能 (DELETE)
【受け取る】 IDを受け取る（request.json）
【出す】 過去データを全部読み込む
【選別】 IDが一致しないものだけ残す（filter）
【戻す】 残ったデータを整形して、ファイルに上書き保存する
【返事】 OKと答える 
*/}