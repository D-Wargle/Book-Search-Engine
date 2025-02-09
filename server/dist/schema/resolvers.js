import User from '../models/User.js'; // Import Mongoose User model
import { AuthenticationError } from 'apollo-server-express'; // For handling auth errors
import { signToken } from '../services/auth.js'; // Use your existing auth utility
export const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in....me issue');
            }
            return await User.findById(String(context.user._id));
        },
    },
    Mutation: {
        addUser: async (_parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });
            const token = signToken(newUser.username, newUser.email, String(newUser._id));
            return { token, user: newUser };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }
            const isValidPassword = await user.isCorrectPassword(password);
            if (!isValidPassword) {
                throw new AuthenticationError('Invalid credentials');
            }
            const token = signToken(user.username, user.email, String(user._id));
            return { token, user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to save a book.');
            }
            try {
                console.log("Context User:", context.user);
                console.log("Input:", input);
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: input } }, // Prevents duplicate entries
                { new: true } // Returns the updated document
                );
                if (!updatedUser) {
                    throw new Error("User not found.");
                }
                return updatedUser;
            }
            catch (error) {
                console.error("Error saving book:");
                throw new Error("Failed to save the book.");
            }
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to remove a book.');
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, { new: true });
                if (!updatedUser) {
                    throw new Error("User not found.");
                }
                return updatedUser;
            }
            catch (error) {
                console.error("Error removing book:");
                throw new Error("Failed to remove the book.");
            }
        }
    },
};
export default resolvers;
