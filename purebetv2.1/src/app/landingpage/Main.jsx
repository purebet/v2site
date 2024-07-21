import Image from "next/image"
export default function Main(){
    return(
    <>
    <div>
    <Image src="/baseball.png" width={100} height={100} alt="baseball"/>
    <Image src="/rugby.png" width={267} height={280} alt="rubgby"/>
    <Image src="/Soccer.png" width={295} height={292} alt="baseball"/>
    <Image src="/Basketball.png" width={270} height={270} alt="baseball"/>
    </div>
    </>
    )
}