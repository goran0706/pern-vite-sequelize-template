import {DataTypes} from 'sequelize';
import User from './user.model.js';
import db from './index.js';

const Post = db.sequelize.define(
    'Post',
    {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define the association at the Database level.
        // userId: {
        //   type: DataTypes.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: 'User', // The name of the target table (case-sensitive)
        //     key: 'id', // The name of the target column (case-sensitive)
        //   },
        // },
    },
    {
        // Other model options go here
        timestamps: true, // Enable timestamps
        // createdAt: false, // Don't create createdAt
        // updatedAt: false, // Don't create updatedAt
        // updatedAt: 'updateTimestamp', // updatedAt should be called updateTimestamp
    }
);

// Define the association at the Sequelize level.
Post.belongsTo(User, {foreignKey: 'userId'});

export default Post;
