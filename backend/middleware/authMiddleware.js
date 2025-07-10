const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Is middleware ka naam protect hai, aur iska kaam user authentication aur authorization ko ensure karna hai.
//  Yeh middleware aapke Express.js application mein istemal hota hai, jisse aap protected routes par access control laga sakte hain.
// Is middleware ka main purpose yeh hai ki yeh ensure kare ki sirf authenticated users hi protected routes tak access
//  kar sakein. Agar user ke paas valid token nahi hai, to unhe access nahi diya jayega. Isse aapke application ki
// security badh jaati hai.
