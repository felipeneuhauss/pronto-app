import AppLayout from 'components/Layouts/AppLayout'
import FabButton from 'components/FabButton'

const Dashboard = () => {
  return (
    <AppLayout className="relative"
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Vendas
        </h2>
      }>
      <div className="py-2">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-3">
          {/*   <SaleSearchForm handleSearch={handleSearch}></SaleSearchForm> */}
          {/*   {!isCommercialAssistant(user) && <> */}
          {/*     <div className={'flex flex-wrap sm:flex-nowrap justify-between mt-4'} ref={containerResultRef}> */}
          {/*       <Card className={'w-full sm:w-1/4 p-4 border-blue-400 my-2'}> */}
          {/*         <span className={'relative text-gray-500'}>Valor vendido</span> */}
          {/*         <div className={'text-extrabold text-2xl flex flex-row justify-between'}> */}
          {/*           <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-gray-500 mt-2" fill="grey" viewBox="0 0 24 24" strokeWidth={2}> */}
          {/*             <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /> */}
          {/*           </svg> */}
          {/*           <span className={'mt-2'}>{totalSold}</span> */}
          {/*         </div> */}
          {/*       </Card> */}
          {/*       <Card className={'w-full sm:w-1/4 p-4 border-green-400 my-2'}> */}
          {/*         <span className={'relative text-gray-500'}>Valor faturado</span> */}
          {/*         <div className={'text-extrabold text-2xl flex flex-row justify-between'}> */}
          {/*           <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" viewBox="0 0 20 20" fill="grey"> */}
          {/*             <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> */}
          {/*           </svg> */}
          {/*           <span className={'mt-2'}>{totalInvoiced}</span> */}
          {/*         </div> */}
          {/*       </Card> */}
          {/*       <Card className={'w-full sm:w-1/4 p-4 border-yellow-400 my-2'}> */}
          {/*         <a className={'cursor-pointer'} onClick={() => handleSearch({ status: 'not_paid' })}> */}
          {/*           <span className={'relative text-gray-500'}>Faturas pendentes</span> */}
          {/*           <div className={'text-extrabold text-2xl flex flex-row justify-between'}> */}
          {/*             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}> */}
          {/*               <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> */}
          {/*             </svg> */}
          {/*             <span className={'mt-2'}>{totalPending}</span> */}
          {/*           </div> */}
          {/*         </a> */}
          {/*       </Card> */}
          {/*       <Card className={'w-full sm:w-1/4 p-4 border-green-400 my-2'}> */}
          {/*         <a className={'cursor-pointer'} onClick={() => handleSearch({ status: 'paid' })}> */}
          {/*           <span className={'relative text-gray-500'}>Comissão 5%</span> */}
          {/*           <div className={'text-extrabold text-2xl flex flex-row justify-between'}> */}
          {/*             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 fill-gray-500 mt-3" viewBox="0 0 20 20" fill="grey"> */}
          {/*               <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /> */}
          {/*             </svg> */}
          {/*             <span className={'mt-2'}>{totalCommission}</span> */}
          {/*           </div> */}
          {/*         </a> */}
          {/*       </Card> */}
          {/*     </div> */}
          {/*   </>} */}
          {/*   <div className={'relative pt-6'}> */}
          {/*     <a onClick={downloadReport}> */}
          {/*       <div className={'absolute right-4 top-2'}> */}
          {/*         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" */}
          {/*           stroke="currentColor" strokeWidth="2"> */}
          {/*           <path strokeLinecap="round" strokeLinejoin="round" */}
          {/*             d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/> */}
          {/*         </svg> */}
          {/*       </div> */}
          {/*     </a> */}
          {/*     <InfiniteScroll */}
          {/*       dataLength={items.length} // This is important field to render the next data */}
          {/*       next={fetchData} */}
          {/*       hasMore={hasMore} */}
          {/*       loader={<h4 className={'text-center p-2'}>Carregando...</h4>} */}
          {/*       endMessage={ */}
          {/*         <p className="mt-3 text-center"> */}
          {/*           <b>Yay! Tudo carregado.</b> */}
          {/*         </p> */}
          {/*       } */}
          {/*     > */}
          {/*       {items.map((sale: SaleMapped, key: number) => { */}
          {/*         return <SaleCard sale={sale} key={key} /> */}
          {/*       })} */}
          {/*     </InfiniteScroll> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
      <FabButton url={'/admin/sale/new'} />
    </AppLayout>
  )
}

export default Dashboard
