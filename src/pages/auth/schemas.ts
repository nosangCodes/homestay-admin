import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

// const MAX_FILE_SIZE = 1024 * 1024 * 5;
// const ACCEPTED_IMAGE_MIME_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const createRoomSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title should be less than 50 characters."),
  description: z
    .string()
    .min(50, "Description should be have atleast 50 characters.")
    .max(225, "Description should be less than 225 characters."),
  rate: z.coerce
    .number({
      required_error: "Rate is required",
      invalid_type_error: "Rate must be a number",
    })
    .int()
    .positive()
    .min(100, { message: "Rate should be at least 100" }),
  underMaintenance: z.boolean({ message: "This field is required" }),
  facilities: z
    .array(z.number())
    .min(1, "Atleast 1 facility required")
    .default([]),
  thumbnail: z.any(),
  images: z.any(),
});

// .refine(
//   (files: FileList) => files && files.length > 0,
//   "Image is required."
// ),

// .refine(
//   (files: FileList) => files && files.length > 0,
//   "Image is required."
// )
// .refine(
//   (files: FileList) => {
//     return files && files.length > 0 && files[0].size <= MAX_FILE_SIZE;
//   },
//   {
//     message: "Max image size is 5MB.",
//   }
// )
// .refine(
//   (files: FileList) =>
//     files &&
//     files.length > 0 &&
//     ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type),
//   "Only .jpg, .jpeg, .png and .webp formats are supported."
// ),
export type createRoomSchemaType = z.infer<typeof createRoomSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
