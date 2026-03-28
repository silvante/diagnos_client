import Image from "next/image";

export default function BG() {
  return (
    <Image
      src={"/backgraund/BG.svg"}
      alt="BG"
      width={100}
      height={100}
      className="w-full h-screen -z-10 absolute"
    />
  );
}
