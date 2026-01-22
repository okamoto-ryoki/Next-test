type NewItem = {
    id?: string;
    title?: string;
    time?: string;
}

type Props = {
    lists: NewItem[];
}

export default function StudyList({lists}: Props) {
    return (
    <>
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
    </>
)}