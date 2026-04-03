import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createSheetFromTemplate,
    createSheetTemplate,
    exportMemberListToSheet,
    exportAttendanceReportToSheet,
    fetchGoogleSheetEmbedLink,
    listGoogleSheetsTemplates,
} from "../../services/googleSheetsService";

export const createSheetFromTemplateAsync = createAsyncThunk(
    "googleSheets/createSheetFromTemplate",
    async (sheetData, thunkAPI) => {
        try {
            const data = await createSheetFromTemplate(sheetData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createSheetTemplateAsync = createAsyncThunk(
    "googleSheets/createSheetTemplate",
    async (templateData, thunkAPI) => {
        try {
            const data = await createSheetTemplate(templateData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const exportMemberListToSheetAsync = createAsyncThunk(
    "googleSheets/exportMemberListToSheet",
    async (exportData, thunkAPI) => {
        try {
            const data = await exportMemberListToSheet(exportData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const exportAttendanceReportToSheetAsync = createAsyncThunk(
    "googleSheets/exportAttendanceReportToSheet",
    async (exportData, thunkAPI) => {
        try {
            const data = await exportAttendanceReportToSheet(exportData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchGoogleSheetEmbedLinkAsync = createAsyncThunk(
    "googleSheets/fetchEmbedLink",
    async (sheetId, thunkAPI) => {
        try {
            const data = await fetchGoogleSheetEmbedLink(sheetId);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const listGoogleSheetsTemplatesAsync = createAsyncThunk(
    "googleSheets/listTemplates",
    async (_, thunkAPI) => {
        try {
            const data = await listGoogleSheetsTemplates();

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const googleSheetsSlice = createSlice({
    name: "googleSheets",
    initialState: {
        templates: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle createSheetFromTemplateAsync
            .addCase(createSheetFromTemplateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSheetFromTemplateAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createSheetFromTemplateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create sheet from template.";
            })

            // Handle createSheetTemplateAsync
            .addCase(createSheetTemplateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSheetTemplateAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createSheetTemplateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to create sheet template.";
            })

            // Handle exportMemberListToSheetAsync
            .addCase(exportMemberListToSheetAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportMemberListToSheetAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportMemberListToSheetAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to export member list to sheet.";
            })

            // Handle exportAttendanceReportToSheetAsync
            .addCase(exportAttendanceReportToSheetAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(exportAttendanceReportToSheetAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(exportAttendanceReportToSheetAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to export attendance report to sheet.";
            })

            // Handle fetchGoogleSheetEmbedLinkAsync
            .addCase(fetchGoogleSheetEmbedLinkAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoogleSheetEmbedLinkAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(fetchGoogleSheetEmbedLinkAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch Google Sheet embed link.";
            })

            // Handle listGoogleSheetsTemplatesAsync
            .addCase(listGoogleSheetsTemplatesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(listGoogleSheetsTemplatesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.templates = action.payload.data;
            })
            .addCase(listGoogleSheetsTemplatesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to list Google Sheets templates.";
            });
    },
});

export const {} = googleSheetsSlice.actions;
export default googleSheetsSlice.reducer;