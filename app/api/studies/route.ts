import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const dataFilePath = path.join(process.cwd(), "src/data.json");

export async function GET() {
    try {
        const fileContent = fs.readFileSync(dataFilePath, "utf8");

        const data = JSON.parse(fileContent);

        return NextResponse.json(data);

    } catch(error) {
        return NextResponse.json({error: "失敗" }, {status: 500});
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json(); //新規のデータをとってきて、（request.json() → JSONではなく）JSにする

        let currentData = [];
        if(fs.existsSync(dataFilePath)) {
            const fileContent = fs.readFileSync(dataFilePath, "utf8")
            if(fileContent) {
                currentData = JSON.parse(fileContent);
            }
        } // 既存のデータをJSにする

        const newData = [...currentData, body]; //　JSで統合する

        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2)); // 

        return NextResponse.json({message: "OK"});
    } catch(error) {
        return NextResponse.json({error: "失敗" }, {status: 500});
    }
}