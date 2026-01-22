"use client";
import InputForm from "@/components/InputForm";
import StudyList from "@/components/StudyList";
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

  // const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setContent(e.target.value);
  // } //学習内容の入力フォーム

  // const timeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setTime(e.target.value);
  // } //学習時間の入力フォーム

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
      <InputForm 
      setContent={setContent}
      setTime={setTime}
      content={content}
      time={time}
      error={error}
      handleRegister={handleRegister}
      ></InputForm>
      <StudyList lists={lists}></StudyList>
    </div>
  );
}
