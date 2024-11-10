"use client";

import { useRouter } from "next/navigation";

type Props = {
  CTAmsg: string;
};

export default function CTAbutton({ CTAmsg }: Props) {
  const router = useRouter();

  const handleCTAbutton = () => {
    router.push("/signup");
  };

  return <button onClick={handleCTAbutton}  className="w-full max-w-md py-4 px-6 bg-yellow-500 text-white text-lg font-bold rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg transition transform hover:scale-105">{CTAmsg}</button>;
}
