"use client";

type Props = {
    setContent: (value :string) => void;
    setTime: (value :string) => void;

    content: string;
    time: string;
    error: boolean;
    
    handleRegister: (e: React.FormEvent) =>void;
}

export default function InputForm({setContent,setTime,content,time,error,handleRegister}:Props) {
    return (
      <form className="border-[#303b4a] border-2  bg-[#1e2938] rounded-lg max-w-sm w-full px-6 py-7">
        <div className="bg-[#1e2938] mb-4">
          <label className="block bg-[#1e2938] text-sm" htmlFor="content">学習内容</label>
          <input className="border-[#303b4a] rounded-lg border-2 bg-[#101828] w-full mt-1 px-3 py-2" placeholder="学習した内容を入力" onChange={(e)=>setContent(e.target.value)} value={content} type="text" id="content"/>
        </div>
        <div className="bg-[#1e2938] mb-4">
          <label className="block bg-[#1e2938] text-sm" htmlFor="time">学習時間</label>
          <div className="flex justify-between items-center gap-1 w-full bg-[#1e2938]">
            <input className="border-[#303b4a] rounded-lg border-2 bg-[#101828] flex-1 mt-1 px-3 py-2" placeholder="数字のみ（例：1）" onChange={(e)=>setTime(e.target.value)} value={time} type="text" id="time"/>
            <label className="bg-[#1e2938] text-sm w-auto"  htmlFor="time">時間</label>
          </div>
        </div>
        <div className={`bg-[#1e2938] text-red-500 font-bold  ${error ? "visible" : "invisible"}`}>※入力内容を確認してください。</div>
        <button className="bg-[#4f39f6] rounded-lg text-sm w-full px-12 py-3" onClick={handleRegister}>登録</button>
      </form> 
)}