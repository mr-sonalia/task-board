/** @format */

import bcrypt from "bcrypt";
import mongoose, { Types } from "mongoose";
import supertest from "supertest";
import app from "../app";
import { User } from "../models";
import { IUser } from "../types";
import { generateTestPasswordHash } from "../utils/helpers";

const api = supertest(app);

describe("Users in the db", () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await generateTestPasswordHash("test_password");

		const user = await new User({
			name: {
				first: "Yash",
				last: "Sonalia",
			},
			username: "sonaliayash",
			email: "sonaliayash@gmail.com",
			passwordHash,
			task_list_ref: [],
		}).save();
	});

	test("Successful user creation", async () => {
		const user = {
			name: {
				first: "Jai",
				last: "Sonalia",
			},
			username: "sonaliajai",
			email: "jaiyash@gmail.com",
			password: "test_password",
			task_list_ref: [],
		};

		const response = await api
			.post("/api/users")
			.send(user)
			.expect(201)
			.expect("Content-Type", /application\/json/);
	});

	test("Unsuccessful user creation, expect user already exists", async () => {
		// Generate sample user password
		const user = {
			name: {
				first: "Yash",
				last: "Sonalia",
			},
			username: "sonaliayash",
			email: "sonaliayash@gmail.com",
			password: "sample_password",
			task_list_ref: [],
		};

		const response = await api
			.post("/api/users")
			.send(user)
			.expect(409)
			.expect("Content-Type", /application\/json/);

		expect(response.body).toEqual({ error: "User already exists" });
	});

	test("Find user, expect valid ID format and user nonexistent", async() => {
		const response = await api
           .get(`/api/users/62ecf0535ff8ac923360ed49`)
           .expect(404);

		   expect(response.body).toEqual({
				message: "User not found",
				id: "62ecf0535ff8ac923360ed49",
			});
	})	
	
	test("Find user, expect invalid ID format", async() => {
		const response = await api
           .get(`/api/users/051515121`)
           .expect(400);

		   expect(response.body).toEqual({
				error: "malformatted id",
			});
	})

	test("Password update, expect valid credentials", async() => {
		const response = await api
			.patch(`/api/users`)
			.send({
				email: "sonaliayash@gmail.com",
				password: "sonaliayash1234",
			})
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body).toEqual({
			message: "Password change successful",
		});
	})	
	
	test("Password update, expect invalid credentials", async() => {
		const response = await api
			.patch(`/api/users`)
			.send({
				email: "sonaliacash@gmail.com",
				password: "sonaliacash1234",
			})
			.expect(404)
			.expect("Content-Type", /application\/json/);

		expect(response.body).toEqual({message: "User not found"});
	})

	test("User deletion, expect valid credentials", async() => {
		await api
		.delete("/api/users")
		.send({
			email: "sonaliayash@gmail.com",
			password: "test_password"
		})
		.expect(200)
	})
	
	test("User deletion, expect invalid credentials", async() => {
		await api
		.delete("/api/users")
		.send({
			email: "sonaliacash@gmail.com",
			password: "test_password"
		})
		.expect(404)
	})

	afterAll(() => mongoose.connection.close());
});

