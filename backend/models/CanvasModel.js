const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    elements: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
    },

    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],

}, {
    timestamps: true,
    collection: 'canvases',
});

// Get all canvases owned by or shared with a user
canvasSchema.statics.getAllCanvases = async function(email) {
    try {
        const User = mongoose.model('Users');

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const canvases = await this.find({
            $or: [
                { owner: user._id },
                { sharedWith: user._id }
            ]
        });

        return canvases;

    } catch (error) {
        throw new Error(error.message);
    }
};

canvasSchema.statics.createCanvas = async function(email, name) {
    try {
        const User = mongoose.model('Users');

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const canvas = new this({
            owner: user._id,
            name: name,
            elements: [],
            sharedWith: []
        });

        return await canvas.save();

    } catch (error) {
        throw new Error(error.message);
    }
};

// canvasSchema.statics.deleteCanvas = async function(email, canvasId) {
//     try {
//         const User = mongoose.model('Users');
//         const user = await User.findOne({ email });
//         if (!user) {
//             throw new Error("User not found");
//         }
//         const canvas = await this.findOneAndDelete({
//             _id: canvasId,
//             owner: user._id
//         });
//         if (!canvas) {
//             throw new Error("Canvas not found");
//         }
//         return canvas;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };




canvasSchema.statics.loadCanvas = async function(email, canvasId) {
    try {
        const User = mongoose.model('Users'); 
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const canvas = await this.findOne({
            _id: canvasId,
            $or: [
                { owner: user._id },
                { sharedWith: user._id }
            ]
        });
        if (!canvas) {
            throw new Error("Canvas not found or access denied");
        }
        return canvas;
    } catch (error) {
        throw new Error(error.message);
    }
};

canvasSchema.statics.updateCanvas = async function(email, canvasId, elements) {
    try {
        const User = mongoose.model('Users');
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");}
        const canvas = await this.findOneAndUpdate(
            {
                _id: canvasId,
                $or: [
                    { owner: user._id },
                    { sharedWith: user._id }
                ]
            },
            {elements},
            {returnDocument: "after"}
        );
        if (!canvas) {
            throw new Error("Canvas not found or access denied");
        }
        return canvas;
    } catch (error) {
        throw new Error(error.message);
    }
};


canvasSchema.statics.shareCanvas = async function (ownerEmail, canvasId, shareWithEmail) {
    try {
        const User = mongoose.model("Users");
        const owner = await User.findOne({ email: ownerEmail });
        if (!owner) {
            throw new Error("Owner not found");
        }
        // User to share with
        const userToShare = await User.findOne({ email: shareWithEmail });
        if (!userToShare) {
            throw new Error("User to share with not found");
        }
        // Find canvas owned by the authenticated user
        const canvas = await this.findOne({
            _id: canvasId,
            owner: owner._id,
        });

        if (!canvas) {
            throw new Error("Canvas not found or access denied");
        }
        // Prevent duplicate sharing
        if (canvas.sharedWith.includes(userToShare._id)) {
            throw new Error("Canvas already shared with this user");
        }
        canvas.sharedWith.push(userToShare._id);
        return await canvas.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

const Canvas =
    mongoose.models.Canvas ||
    mongoose.model("Canvas", canvasSchema);

module.exports = Canvas;