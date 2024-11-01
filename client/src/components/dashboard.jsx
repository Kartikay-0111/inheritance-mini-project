import React from "react";
import PieChart from "./PieChart";
import Propretyref from "./propretyref";
import TotalRevenueChart from "./Totalrevenue";
function Dashboard() {
   return (
      <div className="w-full">
         <p className="ml-3 font-mono font-bold text-3xl">Dashboard</p>
         <div className="mt-5 flex flex-row justify-evenly flex-wrap gap-1">
            <PieChart
               title="Properties for sale"
               value={644}
               series={[75, 25]}
               colours={['#FF5733', '#33FF57']}
            />
            <PieChart
               title="Successful deals"
               value={644}
               series={[75, 25]}
               colours={['#FF5733', '#33FF57']}
            />
            <PieChart
               title="Customers"
               value={644}
               series={[60, 40]}
               colours={['#FF5733', '#33FF57']}
            />
            <PieChart
               title="Properties for rent"
               value={644}
               series={[50, 50]}
               colours={['#FF5733', '#33FF57']}
            />
         </div>
         <div className="mt-5 flex flex-row flex-wrap">
            <div className=" lg:basis-3/5 basis-full ">
               <TotalRevenueChart />
            </div>
            <div className="lg:basis-2/5 basis-full">
               <Propretyref />
            </div>
         </div>
      </div>
   )
}
export default Dashboard;