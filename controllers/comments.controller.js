const commentsModel = require("../models/comments");

const addComment = async (req, res) => {
    const commentData = req.body;
    let comment;

    try {
        comment = await commentsModel.addComment(commentData);
    } catch (err) {
        console.error(`error adding comment ${err}`);
        return res.sendStatus(400);
    }
    
    if(!comment) return res.sendStatus(404);
    
    return res.status(200).json({comment});
}

const getComments = async (req, res) => {
    const params = req.query;
    let comments;
    
    try{
        comments = await commentsModel.getComments(params.filter, params.sort);
    } catch (err) {
        console.error(`Error getting comments ${err}`);
        return res.sendStatus(500);
    }
    
    if(!comments?.length) return res.sendStatus(404);
    
    return res.status(200).json({results: comments});
}

const getCommentsForUser = async (req, res) => {
    const {userId} = req.params
    const queryParams = req.query;
    let comments;
    console.log(`putaaaa ${userId}`)
    if(!userId){
        return res.sendStatus(400);
    }

    try{
        comments = await commentsModel.getComments(queryParams.filter, queryParams.sort, userId);
    } catch (err) {
        console.error(`puta Error getting comments ${err}`);
        return res.sendStatus(500);
    }
    
    if(!comments?.length) return res.sendStatus(404);

    return res.status(200).json({results: comments});
}

module.exports = {
    addComment,
    getComments,
    getCommentsForUser,
}