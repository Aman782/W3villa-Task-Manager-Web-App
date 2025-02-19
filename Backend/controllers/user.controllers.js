import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'Email already registered' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {{
      httpOnly: true, // ✅ Prevents client-side access
      secure: true, // ✅ Ensures it works only on HTTPS
      sameSite: "None", // ✅ Required for cross-site cookies
  });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // ✅ Prevents client-side access
      secure: true, // ✅ Ensures it works only on HTTPS
      sameSite: "None", // ✅ Required for cross-site cookies
  });

    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    await User.findOneAndUpdate({ _id: req.user._id }, { refreshToken: null });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const userInfo = async (req, res) =>{
   try {
    console.log(req.user);
    const userId = req.user._id;
 
    const UserInfo = await User.findById(userId);
 
    if(!UserInfo){
      return res.status(404).json("User Does Not Exists!");
    }
 
    return res.status(200).json(UserInfo);
   } catch (error) {
     console.log(error);
     return res.status(500).json("Internal Server Error!, try again later");
   }
}
