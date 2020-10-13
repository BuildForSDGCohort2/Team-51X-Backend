const generateCode = (prefix) => {
    let newstartDate = new Date();
    let startDate = newstartDate.toISOString().replace(/[-T:\.Z]/g, "");
    return prefix + startDate;
};

export default generateCode;