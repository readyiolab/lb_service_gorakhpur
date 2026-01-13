import * as z from 'zod';

// ============ ADMIN AUTH SCHEMAS ============
export const loginSchema = z.object({
  admin_email: z.string().email('Invalid email address'),
  admin_password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  admin_name: z.string().min(2, 'Name must be at least 2 characters'),
  admin_email: z.string().email('Invalid email address'),
  admin_password: z.string().min(6, 'Password must be at least 6 characters'),
  admin_role: z.enum(['admin', 'super_admin']),
});

// ============ BLOG EDITOR SCHEMA ============
export const blogEditorSchema = z.object({
  blog_title: z.string().min(5, 'Title must be at least 5 characters'),
  blog_excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(200, 'Excerpt must be less than 200 characters'),
  blog_description: z.string().min(20, 'Description must be at least 20 characters'),
  blog_content: z.string().min(50, 'Content must be at least 50 characters'),
  blog_tags: z.string().optional(),
  blog_author: z.string().min(2, 'Author name is required'),
  blog_status: z.enum(['draft', 'published', 'archived']),
});

// ============ TYPE EXPORTS ============
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type BlogEditorFormValues = z.infer<typeof blogEditorSchema>;

// ============ API CONFIGURATION ============

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api'
  : 'https://lbservicesgorakhpur.com/api';
// ============ AUTH API CALLS ============
export const authApi = {
  login: async (values: LoginFormValues) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    return response.json();
  },

  signup: async (values: SignupFormValues) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    return response.json();
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getToken: () => localStorage.getItem('admin_token'),
  
  getUser: () => {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  },

  setToken: (token: string) => {
    localStorage.setItem('admin_token', token);
  },

  setUser: (user: any) => {
    localStorage.setItem('admin_user', JSON.stringify(user));
  },
};

// ============ BLOG API CALLS ============
export const blogApi = {
  create: async (formData: FormData, site: 'lb_services' | 'lb_interiors') => {
    formData.append('blog_site', site);
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
      body: formData,
    });
    return response.json();
  },

  update: async (blogId: number, formData: FormData, site: 'lb_services' | 'lb_interiors') => {
    formData.append('blog_site', site);
    const response = await fetch(`${API_BASE_URL}/blog/${blogId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
      body: formData,
    });
    return response.json();
  },

  delete: async (blogId: number) => {
    const response = await fetch(`${API_BASE_URL}/blog/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  getById: async (blogId: number) => {
    const response = await fetch(`${API_BASE_URL}/blog/${blogId}`, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },

  getAll: async (site?: 'lb_services' | 'lb_interiors') => {
    const url = site ? `${API_BASE_URL}/blog?blog_site=${site}` : `${API_BASE_URL}/blog`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },

  getBySlug: async (slug: string, site: 'lb_services' | 'lb_interiors' = 'lb_services') => {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}?blog_site=${site}`, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },
};

// ============ CONTACT API CALLS ============
export const contactApi = {
  submitServices: async (data: {
    contact_name: string;
    contact_phone: string;
    contact_email?: string;
    contact_service: string;
    contact_location?: string;
    contact_message?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/contact/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  submitInteriors: async (data: {
    contact_name: string;
    contact_phone: string;
    contact_email?: string;
    contact_project_details: string;
    contact_location?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/contact/interiors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getAll: async (site: 'lb_services' | 'lb_interiors') => {
    const response = await fetch(`${API_BASE_URL}/contact?contact_site=${site}`, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },

  getById: async (contactId: number) => {
    const response = await fetch(`${API_BASE_URL}/contact/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },

  updateStatus: async (contactId: number, status: string, site: 'lb_services' | 'lb_interiors') => {
    const response = await fetch(`${API_BASE_URL}/contact/${contactId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
      body: JSON.stringify({ contact_status: status, contact_site: site }),
    });
    return response.json();
  },

  delete: async (contactId: number, site: 'lb_services' | 'lb_interiors') => {
    const response = await fetch(`${API_BASE_URL}/contact/${contactId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
      body: JSON.stringify({ contact_site: site }),
    });
    return response.json();
  },

  getStats: async (site: 'lb_services' | 'lb_interiors') => {
    const response = await fetch(`${API_BASE_URL}/contact/stats?contact_site=${site}`, {
      headers: {
        'Authorization': `Bearer ${authApi.getToken()}`,
      },
    });
    return response.json();
  },
};

// ============ UTILITY FUNCTIONS ============
export const createFormData = (values: BlogEditorFormValues, imageFile?: File): FormData => {
  const formData = new FormData();
  formData.append('blog_title', values.blog_title);
  formData.append('blog_excerpt', values.blog_excerpt);
  formData.append('blog_description', values.blog_description);
  formData.append('blog_content', values.blog_content);
  formData.append('blog_tags', values.blog_tags || '');
  formData.append('blog_author', values.blog_author);
  formData.append('blog_status', values.blog_status);

  if (imageFile) {
    formData.append('blog_image', imageFile);
  }

  return formData;
};
