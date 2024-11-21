import SideBar from "@/components/layout/SideBar";

export default function Layout({ children }: React.PropsWithChildren) {
  // console.log("layout등장")
  return (
    <div className='flex flex-1 h-full'>
      
      
      <SideBar />
      <section className='flex-1'>
      {children}
      </section>
      
      
      
      
      
    </div>
  );
}
