import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api';

export const fetchPartners = createAsyncThunk('partners/fetchPartners', async () => {
    const response = await fetch(`${API_URL}/partners`);
    if (!response.ok) throw new Error("Failed to fetch partners");
    const data = await response.json();
    return data.data;
});

export const createPartner = createAsyncThunk('partners/createPartner', async (partnerData) => {
    const response = await fetch(`${API_URL}/partners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData),
    });
    if (!response.ok) throw new Error("Failed to create partner");
    const data = await response.json();
    return data.data;
});

export const updatePartner = createAsyncThunk('partners/updatePartner', async ({ id, partnerData }) => {
    const response = await fetch(`${API_URL}/partners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData),
    });
    if (!response.ok) throw new Error("Failed to update partner");
    const data = await response.json();
    return data.data;
});

export const deletePartner = createAsyncThunk('partners/deletePartner', async (id) => {
    const response = await fetch(`${API_URL}/partners/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error("Failed to delete partner");
    return id;
});

const partnerSlice = createSlice({
    name: 'partners',
    initialState: {
        partners: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.partners = action.payload;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createPartner.fulfilled, (state, action) => {
                state.partners.push(action.payload);
            })
            .addCase(updatePartner.fulfilled, (state, action) => {
                const index = state.partners.findIndex((p) => (p._id || p.id) === (action.payload._id || action.payload.id));
                if (index !== -1) {
                    state.partners[index] = action.payload;
                }
            })
            .addCase(deletePartner.fulfilled, (state, action) => {
                state.partners = state.partners.filter((p) => (p._id || p.id) !== action.payload);
            });
    },
});

export default partnerSlice.reducer;
