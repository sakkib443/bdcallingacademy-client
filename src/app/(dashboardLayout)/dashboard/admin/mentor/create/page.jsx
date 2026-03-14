'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation'; // রিডাইরেক্ট করার জন্য
import { FiPlus, FiTrash2, FiSave, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

// Zod Schema (আপনার Mongoose Schema অনুযায়ী)
const mentorValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  designation: z.string().min(1, 'Designation is required'),
  subject: z.string().min(1, 'Subject is required'),
  specialized_area: z.array(z.string().min(1)).nonempty('At least one specialized area is required'),
  education_qualification: z.array(z.string().min(1)).nonempty('At least one education qualification is required'),
  work_experience: z.array(z.string().min(1)).nonempty('At least one work experience is required'),
  training_experience: z.object({
    years: z.string().min(1, 'Training years is required'),
    students: z.string().min(1, 'Students count is required'),
  }),
  image: z.string().url('Valid image URL is required'),
  details: z.string().min(1, 'Details info is required'),
  lifeJourney: z.string().min(1, 'Life journey is required'),
});

const CreateMentor = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(mentorValidationSchema),
    defaultValues: {
      specialized_area: [''],
      education_qualification: [''],
      work_experience: [''],
    },
  });

  const useDynamicFields = (name) => useFieldArray({ control, name });
  const specFields = useDynamicFields('specialized_area');
  const eduFields = useDynamicFields('education_qualification');
  const workFields = useDynamicFields('work_experience');

  // Submit Handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/mentors/create-mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Mentor created successfully! ✅');
        reset();
        router.push('/dashboard/admin/mentor'); // সাকসেস হলে লিস্ট পেজে নিয়ে যাবে
      } else {
        alert(`Error: ${result.message || 'Failed to create mentor'}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert('Network error! Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#f79952]/20 focus:border-[#f79952] outline-none text-[13px] transition-all bg-white";
  const labelClass = "block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider";
  const errorClass = "text-red-500 text-[10px] mt-1 font-medium italic";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/dashboard/admin/mentor" className="flex items-center gap-2 text-slate-500 hover:text-[#f79952] transition-colors text-xs mb-2 font-medium">
              <FiArrowLeft /> Back to List
            </Link>
            <h1 className="text-2xl font-outfit font-bold text-slate-900">Create New Mentor</h1>
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            style={{ backgroundColor: '#f79952' }}
            className="flex items-center justify-center gap-2 text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 shadow-lg shadow-[#f79952]/20 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating...
              </span>
            ) : (
              <><FiSave size={18} /> Publish Mentor</>
            )}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Card 1: Basic Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
            <div style={{ color: '#41bfb8' }} className="md:col-span-2 text-[11px] font-extrabold border-b pb-2 uppercase tracking-[2px]">
              Profile Details
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Unique ID</label>
              <input {...register('id')} placeholder="e.g. MNT-001" className={inputClass} />
              {errors.id && <p className={errorClass}>{errors.id.message}</p>}
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Mentor Name</label>
              <input {...register('name')} placeholder="Full Name" className={inputClass} />
              {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Email</label>
              <input {...register('email')} placeholder="email@domain.com" className={inputClass} />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Phone</label>
              <input {...register('phone')} placeholder="+8801XXXXXXXXX" className={inputClass} />
              {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Designation</label>
              <input {...register('designation')} placeholder="e.g. Lead Instructor" className={inputClass} />
              {errors.designation && <p className={errorClass}>{errors.designation.message}</p>}
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Subject</label>
              <input {...register('subject')} placeholder="Main Topic" className={inputClass} />
              {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className={labelClass}>Image URL</label>
              <input {...register('image')} placeholder="https://example.com/photo.jpg" className={inputClass} />
              {errors.image && <p className={errorClass}>{errors.image.message}</p>}
            </div>
          </div>

          {/* Card 2: Training Stats */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div style={{ color: '#41bfb8' }} className="text-[11px] font-extrabold border-b pb-2 mb-5 uppercase tracking-[2px]">Experience Metrics</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className={labelClass}>Years of Experience</label>
                <input {...register('training_experience.years')} placeholder="e.g. 8 Years" className={inputClass} />
                {errors.training_experience?.years && <p className={errorClass}>{errors.training_experience.years.message}</p>}
              </div>
              <div className="space-y-1">
                <label className={labelClass}>Students Trained</label>
                <input {...register('training_experience.students')} placeholder="e.g. 1500+" className={inputClass} />
                {errors.training_experience?.students && <p className={errorClass}>{errors.training_experience.students.message}</p>}
              </div>
            </div>
          </div>

          {/* Dynamic List Sections */}
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: 'Specialized Areas', fields: specFields, name: 'specialized_area', ph: 'e.g. UI/UX Design' },
              { title: 'Education Background', fields: eduFields, name: 'education_qualification', ph: 'e.g. B.Sc in Computer Science' },
              { title: 'Work History', fields: workFields, name: 'work_experience', ph: 'e.g. Senior Dev at Google' }
            ].map((section) => (
              <div key={section.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <label style={{ color: '#41bfb8' }} className="text-[11px] font-extrabold uppercase tracking-[2px]">{section.title}</label>
                  <button
                    type="button"
                    onClick={() => section.fields.append('')}
                    style={{ color: '#f79952' }}
                    className="text-[10px] flex items-center gap-1 font-black hover:bg-[#f79952]/10 px-2 py-1 rounded transition-all"
                  >
                    <FiPlus /> ADD NEW
                  </button>
                </div>
                <div className="space-y-3">
                  {section.fields.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 group">
                      <input
                        {...register(`${section.name}.${index}`)}
                        placeholder={section.ph}
                        className={inputClass}
                      />
                      {section.fields.fields.length > 1 && (
                        <button type="button" onClick={() => section.fields.remove(index)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                          <FiTrash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {errors[section.name] && <p className={errorClass}>{errors[section.name].message}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Card 3: Narratives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <div style={{ color: '#41bfb8' }} className="text-[11px] font-extrabold border-b pb-2 uppercase tracking-[2px]">Biography & Details</div>
            <div className="space-y-1">
              <label className={labelClass}>Detailed Description</label>
              <textarea {...register('details')} rows={4} placeholder="Full professional details..." className={inputClass} />
              {errors.details && <p className={errorClass}>{errors.details.message}</p>}
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Life Journey</label>
              <textarea {...register('lifeJourney')} rows={4} placeholder="The story of their professional path..." className={inputClass} />
              {errors.lifeJourney && <p className={errorClass}>{errors.lifeJourney.message}</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMentor;
