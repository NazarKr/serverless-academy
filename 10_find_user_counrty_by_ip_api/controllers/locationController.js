const { findLocationByIp } = require("../utils/locationOperations");

const getUserLocation = async (req, res) => {
    const { ip } = req.body;
    
    const {
        ip1 = "12.345.678.900",
        ip2 = "12.345.678.900",
        Name = "---",
    } = await findLocationByIp(ip);

    return res.status(200).json({
        request_ip: ip,
        ip_range: `from ${ip1} to ${ip2}`,
        country: Name,
    })
};

module.exports = { getUserLocation };