import { Router } from 'express'
import cloudinarypackage from 'cloudinary'
const cloudinary = cloudinarypackage.v2

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

class Cloudinary {
	constructor() {
		this.uploadUser = this.uploadUser.bind(this)
	}

	static uploadUser = async (fileStr) => {
		try {
			const result = await cloudinary.uploader.upload(
				fileStr,
				{
					folder: 'my-brand/users',
					use_filename: true,
					eager: {
						crop: 'fill',
						gravity: 'center',
						height: 250,
						width: 250,
					},
					type: 'upload',
				},
				function (error, result) {
					return { message: error }
				}
			)
			return {
				message: 'Uploaded successfully',
				secure_url: result.secure_url,
			}
		} catch (error) {
			return error
		}
	}
	
	static uploadPost = async (fileStr) => {
		try {
			const result = await cloudinary.uploader.upload(
				fileStr,
				{
					folder: 'my-brand/articles',
					use_filename: true,
					eager: {
						crop: 'fill',
						gravity: 'center',
						height: 300,
						width: 300,
					},
					type: 'upload',
				},
				function (error, result) {
					return { message: error }
				}
			)
			return {
				message: 'Image added successfully',
				secure_url: result.secure_url,
			}
		} catch (error) {
			return error
		}
	}
}

export default Cloudinary
