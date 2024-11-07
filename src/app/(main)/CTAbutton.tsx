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

  return <button onClick={handleCTAbutton}>{CTAmsg}</button>;
}
