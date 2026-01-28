type NewItem = {
    id?: string;
    title?: string;
    time?: string;
}

type Props = {
    lists: NewItem[];
    onDelete: (id: string) => void; // 関数を受け取る型定義を追加
}

export default function StudyList({lists, onDelete}: Props) {
    return (
    <>
      {lists.length > 0 && 
      <div className="border-2 border-[#303b4a] rounded-lg bg-[#1e2938] max-w-sm w-full m-5 p-6">
        {lists.map((item, index) => (
        <>
          <div key={item.id || index} className="border-2 border-[#303b4a] rounded-lg my-2">
                <h2 className="text-white text-3xl font-bold rounded-tr-lg rounded-tl-lg px-5 py-2.5">{item.title}</h2>
                <div className="flex justify-between items-center text-gray-400 border-[#303b4a] text-sm font-bold border-t-2 rounded-br-lg rounded-bl-lg px-5 py-1.5">
                    <div>{item.time}分</div>
                    <button
                    // 👇 3. 【追加】ここで「!」を使ってIDを渡す！
                    onClick={() => onDelete(item.id!)}
                    className="px-3 py-1 text-sm font-bold text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
                    >
                    削除
                    </button>
                </div>
           </div>
        </>
          
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
    </>
)}