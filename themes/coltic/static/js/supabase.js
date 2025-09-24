import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://unvwxhttpluunfpdmmde.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudnd4aHR0cGx1dW5mcGRtbWRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NzYyNDgsImV4cCI6MjA3NDE1MjI0OH0.z4WwcpWUtXyqN-eq56JneJyBF9DGu1-NYIVkmK-j7tQ"
);

export async function cargarDatos() {
  const container = document.getElementById("supabase-data");
  const inputCantidad = document.getElementById("cantidad");
  const productInfo = document.getElementById("product-info");

  if (!container || !productInfo) return;

  const alias = container.dataset.alias;
  if (!alias) {
    container.textContent = "Alias no encontrado";
    return;
  }

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("alias", alias)
    .single();

  if (error) {
    container.textContent = "Error: " + error.message;
    return;
  }

  const stock = data.stock;

  container.innerHTML = `<p>Stock disponible: ${stock}</p>`;

  // Actualizamos el dataset para cart.js
  productInfo.dataset.stock = stock;

  if (inputCantidad) {
    inputCantidad.max = stock;

    inputCantidad.addEventListener("input", () => {
      let valor = parseInt(inputCantidad.value, 10);
      if (valor < 1) inputCantidad.value = 1;
      if (valor > stock) inputCantidad.value = stock;
    });
  }
}

document.addEventListener("DOMContentLoaded", cargarDatos);
