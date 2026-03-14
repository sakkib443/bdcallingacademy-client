'use client';

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2, FiSave, FiArrowLeft, FiLoader, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

// Zod Schema (আপনার ব্যাকএন্ডের সাথে হুবহু মিলানো)
const courseValidationSchema = z.object({
  id: z.coerce.number().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  type: z.string().min(1, "Type is required"),
  image: z.string().url("Image must be a valid URL"),
  fee: z.string().min(1, "Fee is required"),
  rating: z.coerce.number().min(0).max(5),
  totalRating: z.coerce.number().min(0),
  totalStudentsEnroll: z.coerce.number().min(0),
  mentor: z.string().min(1, "Mentor ID is required"),
  technology: z.string().min(1, "Technology is required"),
  courseStart: z.string().min(1, "Course start date is required"),
  durationMonth: z.coerce.number().min(1),
  lectures: z.coerce.number().min(1),
  totalExam: z.coerce.number().min(0),
  totalProject: z.coerce.number().min(0),
  details: z.string().min(1, "Details are required"),
  courseOverview: z.string().min(1, "Course overview is required"),
  curriculum: z.array(z.string().min(1)).nonempty("At least one curriculum item required"),
  courseIncludes: z.array(
    z.object({
      icon: z.string().min(1, "Icon is required"),
      text: z.string().min(1, "Text is required"),
    })
  ).nonempty("At least one inclusion required"),
  softwareYoullLearn: z.array(z.string().min(1)).nonempty("At least one software required"),
  jobPositions: z.array(z.string().min(1)).nonempty("At least one job position required"),
});

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const router = useRouter();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseValidationSchema),
    defaultValues: {
      rating: 5,
      totalRating: 0,
      totalStudentsEnroll: 0,
      totalExam: 0,
      totalProject: 0,
      curriculum: [''],
      courseIncludes: [{ icon: 'FiCheck', text: '' }],
      softwareYoullLearn: [''],
      jobPositions: [''],
    }
  });

  // Dynamic Fields Helpers
  const curriculums = useFieldArray({ control, name: 'curriculum' });
  const includes = useFieldArray({ control, name: 'courseIncludes' });
  const softwares = useFieldArray({ control, name: 'softwareYoullLearn' });
  const jobs = useFieldArray({ control, name: 'jobPositions' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, mentorRes] = await Promise.all([
          fetch('http://localhost:5000/api/categories'),
          fetch('http://localhost:5000/api/mentors')
        ]);
        const catData = await catRes.json();
        const mentorData = await mentorRes.json();
        setCategories(catData.data || catData);
        setMentors(mentorData.data || mentorData);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/courses/create-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Course Created! ✅');
        router.push('/dashboard/admin/course');
      } else {
        const errResult = await response.json();
        alert(`Server Error: ${errResult.message}`);
      }
    } catch (error) {
      alert('Network error!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#f79952]/20 outline-none text-[13px] transition-all bg-white";
  const labelClass = "block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-poppins">
      <div className="max-w-5xl mx-auto pb-20">

        {/* Back Navigation */}
        <Link href="/dashboard/admin/course" className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-orange-50 text-[#F79952] font-semibold hover:bg-orange-100 transition-colors"
        >
          <FiArrowLeft /> Back to Course&apos;s
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-outfit font-bold text-slate-900">Create New Course</h1>
            <p className="text-slate-500 text-sm mt-1">Fill in the details to publish a new course</p>
          </div>
          <button onClick={handleSubmit(onSubmit)} disabled={loading} className="flex items-center gap-2 bg-[#F79952] hover:bg-[#e68a47] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all disabled:opacity-50">
            {loading ? 'Publishing...' : <><FiSave /> Publish Course</>}
          </button>
        </div>

        {/* ERROR DEBUGGING */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
            <p className="font-bold mb-1 underline">Missing or Invalid Fields:</p>
            {Object.entries(errors).map(([name, err]) => <p key={name}>• {name}: {err.message}</p>)}
          </div>
        )}

        <form className="space-y-8">
          {/* 1. Basic Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5">
            <h2 style={{ color: '#41bfb8' }} className="md:col-span-3 text-xs font-black uppercase border-b pb-2 italic">General Details</h2>
            <div className="md:col-span-2">
              <label className={labelClass}>Course Title</label>
              <input {...register('title')} className={inputClass} placeholder="MERN Stack Masterclass" />
            </div>
            <div>
              <label className={labelClass}>Numeric ID</label>
              <input {...register('id')} className={inputClass} placeholder="e.g. 101" />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input {...register('slug')} className={inputClass} placeholder="mern-stack-course" />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select {...register('category')} className={inputClass}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Mentor</label>
              <select {...register('mentor')} className={inputClass}>
                <option value="">Select Mentor</option>
                {mentors.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-3">
              <label className={labelClass}>Course Image URL</label>
              <input {...register('image')} className={inputClass} />
            </div>
          </div>

          {/* 2. Pricing & Metrics */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-5">
            <h2 style={{ color: '#41bfb8' }} className="md:col-span-4 text-xs font-black uppercase border-b pb-2 italic">Pricing & Metrics</h2>
            <div><label className={labelClass}>Course Fee</label><input {...register('fee')} className={inputClass} /></div>
            <div><label className={labelClass}>Type</label><select {...register('type')} className={inputClass}><option value="Online">Online</option><option value="Offline">Offline</option><option value="Recorded">Recorded</option></select></div>
            <div><label className={labelClass}>Rating</label><input type="number" step="0.1" {...register('rating')} className={inputClass} /></div>
            <div><label className={labelClass}>Total Rating Count</label><input type="number" {...register('totalRating')} className={inputClass} /></div>
            <div><label className={labelClass}>Students Enrolled</label><input type="number" {...register('totalStudentsEnroll')} className={inputClass} /></div>
            <div><label className={labelClass}>Lectures</label><input type="number" {...register('lectures')} className={inputClass} /></div>
            <div><label className={labelClass}>Duration (Months)</label><input type="number" {...register('durationMonth')} className={inputClass} /></div>
            <div><label className={labelClass}>Start Date</label><input {...register('courseStart')} className={inputClass} /></div>

            {/* Added missing Total Exam and Project */}
            <div><label className={labelClass}>Total Exams</label><input type="number" {...register('totalExam')} className={inputClass} /></div>
            <div><label className={labelClass}>Total Projects</label><input type="number" {...register('totalProject')} className={inputClass} /></div>
          </div>

          {/* 3. Dynamic Lists (Curriculum & Includes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Curriculum Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label style={{ color: '#41bfb8' }} className="text-xs font-bold uppercase italic">Course Curriculum</label>
                <button type="button" onClick={() => curriculums.append('')} style={{ color: '#f79952' }} className="text-[10px] font-black underline">+ ADD MODULE</button>
              </div>
              <div className="space-y-3">
                {curriculums.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input {...register(`curriculum.${index}`)} className={inputClass} placeholder={`Module ${index + 1}`} />
                    <button type="button" onClick={() => curriculums.remove(index)} className="text-red-400 p-2"><FiTrash2 /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Includes Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label style={{ color: '#41bfb8' }} className="text-xs font-bold uppercase italic">What&apos;s Included</label>
                <button type="button" onClick={() => includes.append({ icon: 'FiCheck', text: '' })} style={{ color: '#f79952' }} className="text-[10px] font-black underline">+ ADD BENEFIT</button>
              </div>
              <div className="space-y-3">
                {includes.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input {...register(`courseIncludes.${index}.icon`)} placeholder="Icon (FiCheck)" className="w-1/3 px-2 py-2 border rounded-lg text-xs" />
                    <input {...register(`courseIncludes.${index}.text`)} placeholder="Benefit text" className="w-2/3 px-2 py-2 border rounded-lg text-xs" />
                    <button type="button" onClick={() => includes.remove(index)} className="text-red-400 p-2"><FiTrash2 /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Software & Jobs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label style={{ color: '#41bfb8' }} className="text-xs font-bold uppercase italic">Software You&apos;ll Learn</label>
                <button type="button" onClick={() => softwares.append('')} style={{ color: '#f79952' }} className="text-[10px] font-black underline">+ ADD</button>
              </div>
              <div className="space-y-2">
                {softwares.fields.map((f, i) => (
                  <div key={f.id} className="flex gap-2">
                    <input {...register(`softwareYoullLearn.${i}`)} className={inputClass} />
                    <button onClick={() => softwares.remove(i)}><FiTrash2 className="text-red-400" /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <label style={{ color: '#41bfb8' }} className="text-xs font-bold uppercase italic">Job Positions</label>
                <button type="button" onClick={() => jobs.append('')} style={{ color: '#f79952' }} className="text-[10px] font-black underline">+ ADD</button>
              </div>
              <div className="space-y-2">
                {jobs.fields.map((f, i) => (
                  <div key={f.id} className="flex gap-2">
                    <input {...register(`jobPositions.${i}`)} className={inputClass} />
                    <button onClick={() => jobs.remove(i)}><FiTrash2 className="text-red-400" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Narratives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 style={{ color: '#41bfb8' }} className="text-xs font-black uppercase border-b pb-2 italic">Detailed Descriptions</h2>
            <div><label className={labelClass}>Technology (Comma Separated)</label><input {...register('technology')} className={inputClass} /></div>
            <div><label className={labelClass}>Course Overview</label><textarea {...register('courseOverview')} className={inputClass} rows={2} /></div>
            <div><label className={labelClass}>Full Course Details</label><textarea {...register('details')} className={inputClass} rows={4} /></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
