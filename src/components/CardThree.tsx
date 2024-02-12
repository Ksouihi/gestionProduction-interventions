const CardThree = ({visions}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      

      <div className="mt-4 flex  justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
           {visions}
          </h4>
          <span className="text-lg font-bold">Quantité produit</span>
        </div>

        
      </div>
    </div>
  );
};

export default CardThree;
