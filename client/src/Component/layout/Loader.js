import React from "react";

const Loader = () => {
  return (
    <div>
      <div class="d-flex justify-content-center" style={{ marginTop: "15%" }}>
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
