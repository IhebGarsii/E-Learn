const BASE_URL = "http://localhost:4000/courses";

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllCourses`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCourse = async (idCourse) => {
  try {
    const response = await fetch(`${BASE_URL}/getCourse/${idCourse}`, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
export const AddCourse = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/AddCourse`, {
      method: "POST",
      body: formData, // Pass FormData directly
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add course");
  }
};

export const DeleteCourse = async (idUser, idCourse) => {
  try {
    const response = await fetch(`/deleteCourse/${idUser}/${idCourse}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const UpdateCourse = async (formData) => {
  try {
    const response = await fetch(`/updateCourse/${idUser}`, {
      method: "PUT",
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
