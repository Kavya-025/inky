const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'users',
});

userSchema.statics.registerUser = async function(name, email, password) {
    try {
        if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
            );
        }
        const existingUser = await this.findOne({ email });

        if (existingUser) {
            throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new this({
            name,
            email,
            password: hashedPassword,
        });

        return await user.save();

    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.statics.getUser = async function(email) {
    try {
        return await this.findOne({ email });
    } catch (error) {
        throw new Error("Error getting user: " + error.message);
    }
};

userSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error("Invalid email");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error("Invalid password");
        }

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;