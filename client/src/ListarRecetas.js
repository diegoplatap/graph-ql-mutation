import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";

const recipes = gql`
  query ($isVegetarian: Boolean) {
    recipes(vegetarian: $isVegetarian) {
      id
      title
      vegetarian
    }
  }
`;

const agregarReceta = gql`
  mutation AddRecipe($RecipeInput: RecipeInput!) {
    addRecipe(recipe: $RecipeInput) {
      id
      title
      vegetarian
    }
  }
`;

export function ListarRecetas() {
  const [isVegetarian, setIsvegetarian] = useState(false);
  const [addRecipe, setAddRecipe] = useState({
    title: "",
    vegetarian: false,
  });

  const { data, loading } = useQuery(recipes, {
    variables: { isVegetarian: isVegetarian },
  });
  const [agregarRecetaFunction] = useMutation(agregarReceta);

  const handleIsVegetarian = () => {
    setIsvegetarian(!isVegetarian);
  };

  const addRecipeTitleFunction = e => {
    setAddRecipe(prevState => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const addRecipeTypeFunction = e => {
    setAddRecipe(prevState => ({
      ...prevState,
      vegetarian: e.target.checked,
    }));
  };

  console.log(addRecipe);

  return (
    <div>
      <label>Vegetariano</label>
      <input
        type="checkbox"
        name="Vegetariano"
        defaultChecked={false}
        onClick={handleIsVegetarian}
      />
      <br />
      <label>Agregar receta</label>
      <br />
      <input type="text" onChange={addRecipeTitleFunction} />
      <label>Vegetariano</label>
      <input
        type="checkbox"
        name="Vegetariano1"
        defaultChecked={false}
        onClick={addRecipeTypeFunction}
      />
      <button
        onClick={() =>
          agregarRecetaFunction({
            variables: {
              RecipeInput: {
                title: addRecipe.title,
                vegetarian: addRecipe.vegetarian,
              },
            },
          })
        }
      >
        Agregar
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.recipes.map((recipe, idx) => <p key={idx}>{recipe.title}</p>)
      )}
    </div>
  );
}

export default ListarRecetas;
