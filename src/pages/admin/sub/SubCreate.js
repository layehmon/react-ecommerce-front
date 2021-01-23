import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(''); // for select option
  const [subs, setSubs] = useState([]);

  // step 1 seached-filter
  const [keyword, setKeyword] = useState("");

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

  useEffect(() => {
    loadCategories();
    loadSubs(); //load all subs
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
       
        //loadSubs();
        getCategorySubs(category).then((res) => {
          console.log("SELECTED CATEGORY's SUBs", res.data);
         setSubs(res.data); // to load only selected Cat's subs
        });

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const listCategorySubs = (e) => {
    setCategory(e);
    getCategorySubs(e).then((res) => {
      //console.log("SELECTED CATEGORY's SUBs", res.data);
      setSubs(res.data); // to load only selected Cat's subs
    });
  }

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  /**  refactor form
  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Add</button>
      </div>
    </form>
  );
  */

  // step 3 moved
  /**
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
 */
  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-info">Loading..</h4>
          ) : (
            <h4>Create Sub Category</h4>
          )}
          
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => listCategorySubs(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/*JSON.stringify(category)*/}

          {/** step 2 and 3 */}
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />
          <br />
          <h4>Edit or Delete Sub Category</h4>
          
          <LocalSearch 
            keyword={keyword}
            setKeyword={setKeyword}
          />
         
            
          {/* step 5 */}
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-secondary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
