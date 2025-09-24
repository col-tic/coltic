import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://unvwxhttpluunfpdmmde.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudnd4aHR0cGx1dW5mcGRtbWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NzYyNDgsImV4cCI6MjA3NDE1MjI0OH0.z4WwcpWUtXyqN-eq56JneJyBF9DGu1-NYIVkmK-j7tQ";
const supabase = createClient(supabaseUrl, supabaseKey);

async function cargarDatos() {
  let { data, error } = await supabase.from("tu_tabla").select("*");
  const container = document.getElementById("supabase-data");

  if (error) {
    container.innerText = "Error: " + error.message;
  } else {
    container.innerHTML = "<ul>" +
      data.map(item => `<li>${item.nombre}</li>`).join("") +
      "</ul>";
  }
}

cargarDatos();
