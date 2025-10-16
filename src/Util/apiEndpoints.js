// src/Util/apiEndpoints.js

export const base_URL = import.meta.env.VITE_BASE_URL;


const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,

  // Income APIs
  GET_ALL_INCOMES: "/incomes",
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,
  ADD_INCOME: "/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "excel/download/income",
  EMAIL_INCOME: "/email/income-excel",

  // Expense APIs
  GET_ALL_EXPENSES: "/expenses",
  ADD_EXPENSE: "/expenses",
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: "excel/download/expense",
  EMAIL_EXPENSE: "/email/expense-excel",

  Filters: "/filter",

  dashboard:"/dashboard",
  // Cloudinary
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
