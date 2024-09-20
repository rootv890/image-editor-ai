import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

interface DasboardLayoutPrps {
    children:React.ReactNode
}

const DasboardLayout = ({children} : DasboardLayoutPrps) =>
{
  return (
    <div className="bg-muted h-full">
        <Sidebar/>
            <div className="lg:pl-[300px] flex flex-col h-full">
                <Navbar/>

                <main className="bg-white flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
                    {children}
                </main>
            </div>
        </div>
  )
}

export default DasboardLayout
