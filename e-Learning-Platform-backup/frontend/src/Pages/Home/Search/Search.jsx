import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, Typography, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Search = () => {
  const { keyword } = useParams();
  const [query, setQuery] = useState(keyword || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const delayDebounce = setTimeout(() => {
        fetchResults(query);
      }, 400);
      return () => clearTimeout(delayDebounce);
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchResults = async (searchTerm) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/search?keyword=${searchTerm}`);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-500 p-4 sm:p-6">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" className="font-bold text-center text-purple-800 mb-2">
          🔍 Welcome to <span className="text-blue-600">Adhyayan Kendra</span>
        </Typography>
        <Typography variant="subtitle1" className="text-center text-gray-600 mb-6">
          Discover high-quality learning resources, courses, and topics with our smart live search. 📘✨
        </Typography>
        <div className="flex items-center gap-2 mb-4">
          <SearchIcon className="text-blue-600" />
          <Typography variant="h6" className="text-gray-700">
            Start typing to explore topics...
          </Typography>
        </div>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="E.g., JavaScript, Data Science, Machine Learning..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            "& input": { padding: "12px" },
          }}
        />
      </motion.div>

      <div className="mt-8 max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="flex justify-center mt-6">
            <CircularProgress />
          </div>
        ) : (
          <AnimatePresence>
            {results.length > 0 ? (
              results.map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white border-l-4 border-purple-400 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  layout
                >
                  <Typography variant="h6" className="text-purple-800 font-semibold mb-1">
                    🎓 {item.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {item.description}
                  </Typography>
                </motion.div>
              ))
            ) : query && !loading ? (
              <Typography
                variant="body1"
                className="text-center text-gray-600 italic mt-4"
              >
                No results found for <strong>&quot;{query}&quot;</strong> 😕. Try a different keyword!
              </Typography>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Search;
