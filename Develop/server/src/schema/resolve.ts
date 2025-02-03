import { GraphQLError } from 'graphql';
import User from '../models/User.js';
import { signToken } from '../utils/auth.js';

const resolvers = {
    Query: {
        me: async (_: any, __: any, context: { user?: { _id: string } }) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new GraphQLError('Not logged in');
        },
    },
    
    Mutation: {
        addUser: async (_: any, args: { username: string, email: string, password: string }) => {
        try {
            console.log('Starting user creation with:', {
                username: args.username,
                email: args.email,
                password: args.password,
            });
            const user = await User.create({ username, email, password });
            console.log('User created:', user);
            const token = signToken(user.username, user.email, user._id);
            console.log('Token created:', token);
            return { token, user };
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError('Failed to create user');
        }
    };
},