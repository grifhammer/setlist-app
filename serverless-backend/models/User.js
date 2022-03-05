"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const dynamodb_data_mapper_annotations_1 = require("@aws/dynamodb-data-mapper-annotations");
class Image {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", Number)
], Image.prototype, "height", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", Number)
], Image.prototype, "width", void 0);
class Follower {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], Follower.prototype, "href", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", Number)
], Follower.prototype, "total", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], Follower.prototype, "url", void 0);
class Urls {
}
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], Urls.prototype, "spotify", void 0);
let User = class User {
};
__decorate([
    dynamodb_data_mapper_annotations_1.hashKey(),
    __metadata("design:type", String)
], User.prototype, "pk", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.rangeKey(),
    __metadata("design:type", String)
], User.prototype, "sk", void 0);
__decorate([
    dynamodb_data_mapper_annotations_1.attribute(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    dynamodb_data_mapper_annotations_1.table("theOneTable")
], User);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNEZBSytDO0FBRS9DLE1BQU0sS0FBSztDQU1WO0FBSkE7SUFEQyw0Q0FBUyxFQUFFOztxQ0FDRztBQUdmO0lBREMsNENBQVMsRUFBRTs7b0NBQ0U7QUFHZixNQUFNLFFBQVE7Q0FTYjtBQVBBO0lBREMsNENBQVMsRUFBRTs7c0NBQ0M7QUFHYjtJQURDLDRDQUFTLEVBQUU7O3VDQUNFO0FBR2Q7SUFEQyw0Q0FBUyxFQUFFOztxQ0FDQTtBQUdiLE1BQU0sSUFBSTtDQUdUO0FBREE7SUFEQyw0Q0FBUyxFQUFFOztxQ0FDSTtBQUdqQixJQUFhLElBQUksR0FBakIsTUFBYSxJQUFJO0NBMENoQixDQUFBO0FBeENBO0lBREMsMENBQU8sRUFBRTs7Z0NBQ0M7QUFHWDtJQURDLDJDQUFRLEVBQUU7O2dDQUNBO0FBR1g7SUFEQyw0Q0FBUyxFQUFFOzttQ0FDRTtBQVJGLElBQUk7SUFEaEIsd0NBQUssQ0FBQyxhQUFhLENBQUM7R0FDUixJQUFJLENBMENoQjtBQTFDWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVtYmVkIH0gZnJvbSBcIkBhd3MvZHluYW1vZGItZGF0YS1tYXBwZXJcIjtcbmltcG9ydCB7XG5cdGF0dHJpYnV0ZSxcblx0aGFzaEtleSxcblx0cmFuZ2VLZXksXG5cdHRhYmxlLFxufSBmcm9tIFwiQGF3cy9keW5hbW9kYi1kYXRhLW1hcHBlci1hbm5vdGF0aW9uc1wiO1xuaW1wb3J0IHsgc3RyaW5naWZ5IH0gZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XG5jbGFzcyBJbWFnZSB7XG5cdEBhdHRyaWJ1dGUoKVxuXHRoZWlnaHQ6IG51bWJlcjtcblxuXHRAYXR0cmlidXRlKClcblx0d2lkdGg6IG51bWJlcjtcbn1cblxuY2xhc3MgRm9sbG93ZXIge1xuXHRAYXR0cmlidXRlKClcblx0aHJlZjogc3RyaW5nO1xuXG5cdEBhdHRyaWJ1dGUoKVxuXHR0b3RhbDogbnVtYmVyO1xuXG5cdEBhdHRyaWJ1dGUoKVxuXHR1cmw6IHN0cmluZztcbn1cblxuY2xhc3MgVXJscyB7XG5cdEBhdHRyaWJ1dGUoKVxuXHRzcG90aWZ5OiBzdHJpbmc7XG59XG5AdGFibGUoXCJ0aGVPbmVUYWJsZVwiKVxuZXhwb3J0IGNsYXNzIFVzZXIge1xuXHRAaGFzaEtleSgpXG5cdHBrOiBzdHJpbmc7XG5cblx0QHJhbmdlS2V5KClcblx0c2s6IHN0cmluZztcblxuXHRAYXR0cmlidXRlKClcblx0ZW1haWw6IHN0cmluZztcblxuXHQvLyBAYXR0cmlidXRlKClcblx0Ly8gY291bnRyeTogc3RyaW5nO1xuXHQvLyBAYXR0cmlidXRlKClcblx0Ly8gYWNjZXNzX3Rva2VuOiBzdHJpbmc7XG5cdC8vIEBhdHRyaWJ1dGUoKVxuXHQvLyBkaXNwbGF5X25hbWU6IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIGV4cGlyZXNfaW46IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIGV4cGxpY2l0X2NvbnRlbnQ6IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSh7IG1lbWJlclR5cGU6IGVtYmVkKFVybHMpIH0pXG5cdC8vIGV4dGVybmFsX3VybHM6IFVybHM7XG5cdC8vIEBhdHRyaWJ1dGUoeyBtZW1iZXJUeXBlOiBlbWJlZChGb2xsb3dlcikgfSlcblx0Ly8gZm9sbG93ZXJzOiBGb2xsb3dlcjtcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIGhyZWY6IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIGlkOiBzdHJpbmc7XG5cdC8vIEBhdHRyaWJ1dGUoeyBtZW1iZXJUeXBlOiBlbWJlZChJbWFnZSkgfSlcblx0Ly8gaW1hZ2VzOiBJbWFnZTtcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIHByb2R1Y3Q6IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIHJlZnJlc2hfdG9rZW46IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIHNjb3BlOiBzdHJpbmc7XG5cdC8vIEBhdHRyaWJ1dGUoKVxuXHQvLyB0b2tlbl90eXBlOiBzdHJpbmc7XG5cdC8vIEBhdHRyaWJ1dGUoKVxuXHQvLyB1cGRhdGVkQXQ6IHN0cmluZztcblx0Ly8gQGF0dHJpYnV0ZSgpXG5cdC8vIHVyaTogc3RyaW5nO1xufVxuIl19