const thousandsSeparator = (x) => {
    if ( x !== undefined ) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

export default thousandsSeparator;