
"use client";
import { useState } from "react";

  type NewItem = {
    id?: string;
    title?: string;
    time?: string;
  }
  

export default function Home() {
  const [content, setContent] = useState(""); //学習内容の入力の一時保存場所
  const [time, setTime] = useState(""); //学習時間の入力の一時保存場所

  const [lists, setLists] = useState<NewItem[]>([]);  //上2項目とidの一時保存場所

  const [error, setError] = useState(false); // 入力が誤りであるときのメッセージの表示、非表示

  const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  } //学習内容の入力フォーム

  const timeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  } //学習時間の入力フォーム

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); //formのsubmitが反応しないように

    if (!content || !time) {
      setError(true);
      return
    }; //2項目に入力がなかった場合のエラーメッセージの表示

    if(isNaN(Number(time))) {
      setError(true);
      return
    }  //学習時間の入力フォームに数字以外が入った場合のエラーメッセージの表示

    setError(false); //エラーメッセージが出た場合、ここで非表示に

    const newItem :NewItem = {
      id: crypto.randomUUID(),
      title: content,
      time: time
    };  //新しい入力情報のデータを使いやすく、見やすくする

    const section = [...lists, newItem]; //前までのデータと今入力されたデータの保存
    setLists(section);

    setContent("");
    setTime(""); //入力欄に入力した情報が滞留しないために、useStateのリセット
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-[#101828] p-10">
      {/* 入力フォーム */}
      <form className="border-[#303b4a] border-2  bg-[#1e2938] rounded-lg max-w-sm w-full px-6 py-7">
        <div className="bg-[#1e2938] mb-4">
          <label className="block bg-[#1e2938] text-sm" htmlFor="content">学習内容</label>
          <input className="border-[#303b4a] rounded-lg border-2 bg-[#101828] w-full mt-1 px-3 py-2" placeholder="学習した内容を入力" onChange={contentChange} value={content} type="text" id="content"/>
        </div>
        <div className="bg-[#1e2938] mb-4">
          <label className="block bg-[#1e2938] text-sm" htmlFor="time">学習時間</label>
          <div className="flex justify-between items-center gap-1 w-full bg-[#1e2938]">
            <input className="border-[#303b4a] rounded-lg border-2 bg-[#101828] flex-1 mt-1 px-3 py-2" placeholder="数字のみ（例：1）" onChange={timeChange} value={time} type="text" id="time"/>
            <label className="bg-[#1e2938] text-sm w-auto"  htmlFor="time">時間</label>
          </div>
        </div>
        <div className={`bg-[#1e2938] text-red-500 font-bold  ${error ? "visible" : "invisible"}`}>※入力内容を確認してください。</div>
        <button className="bg-[#4f39f6] rounded-lg text-sm w-full px-12 py-3" onClick={(e) => handleRegister(e)}>登録</button>
      </form> 

      {/* 入力情報が出力される */}
      {lists.length > 0 && 
      <div className="border-2 border-[#303b4a] rounded-lg bg-[#1e2938] max-w-sm w-full m-5 p-6">
        {lists.map((list) => (
          <div className="border-2 border-[#303b4a] rounded-lg my-2" key={list.id}>
            <h2 className="text-white text-3xl font-bold rounded-tr-lg rounded-tl-lg px-5 py-2.5">{list.title}</h2>
            <div className="text-gray-400 border-[#303b4a] text-sm font-bold border-t-2 rounded-br-lg rounded-bl-lg px-5 py-1.5">{list.time}時間</div>
          </div>
        ))} 
          <div className="bg-[#1e2938] font-bold mt-3">
            合計勉強時間：
            {lists.reduce((accumulator: any, currentValue: any) => {
              return accumulator + Number(currentValue.time || 0);
            },0)}
            時間
          </div>
      </div>
      }
    </div>
  );
}
