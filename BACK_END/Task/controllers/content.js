import { Content } from "../models/content.js";

export function getAllContent() {
    return Content.find().populate("user", "username");
}

export function getUserContent(req){
    return Content
    .find({user: req.user._id})
    .populate("user", "username email ")
}

export function postNewContent(req){
    const updatedDate = new Date().toJSON().slice(0,10);
    return new Content({
        ...req.body,
        date: updatedDate,
        user: req.user._id
    }).save();
}

export function updatedContent(req) {
    return Content.findOneAndUpdate(
        {_id: req.params.id},
        {$set: req.body},
        {new: true}
    );
}

export function deletedContent(req){
    return Content.findByIdAndDelete({
        _id: req.params.id,
    });
}



