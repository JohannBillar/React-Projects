import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup, ListGroup, ListGroupItem, Modal, PanelGroup, Panel } from 'react-bootstrap';

function EditRecipe(props) {
  const { editModal, closeEdit, name, ingredients, handleNameChange, handleIngredientChange, editRecipe } = props;
  return (
    <Modal show={editModal} onHide={closeEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <FormGroup controlId="formForRecipe">
            <ControlLabel>Recipe</ControlLabel>
            <FormControl
              type="text"
              value={name}
              placeholder="Recipe name"
              onChange={handleNameChange}
            />
            <ControlLabel>Ingredients</ControlLabel>
            <FormControl
              type="text"
              value={ingredients}
              placeholder="Enter ingredients, seperated, by, Commas"
              onChange={handleIngredientChange}
            />
            <Button onClick={closeEdit} className="pull-right">Close</Button>
            <Button onClick={editRecipe} className="pull-right">Edit Recipe</Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
}

function Recipes({ recipes, deleteRecipe, editRecipe, openEdit }) {
  return (
    <PanelGroup defaultActiveKey="2" accordion>
      {
        recipes.map((recipe, idx) =>
          <Panel key={idx} header={recipe.name} eventKey={idx+1}>
            <ListGroup>
              {
                recipe.ingredients.split(', ').map((ingredient, i) =>
                  <ListGroupItem key={i}>
                    {ingredient}
                  </ListGroupItem>
                )
              }
            </ListGroup>
            <Button onClick={() => deleteRecipe(idx)}>Delete</Button>
            <Button onClick={() => openEdit(recipe, idx)}>Edit</Button>
          </Panel>
        )
      }
    </PanelGroup>
  );
}

class RecipeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      editModal: false,
      index: null,
      name: '',
      ingredients: [],
      recipes: [
        { name: 'steak', ingredients: 'one, two, three' },
        { name: 'fish', ingredients: 'four, five, six' },
        { name: 'salad', ingredients: 'seven, eight, nine' },
      ],
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
  }
  openEdit(recipe, idx) {
    this.setState({
      editModal: true,
      name: recipe.name,
      ingredients: recipe.ingredients,
      index: idx,
    });
  }
  closeEdit() {
    this.setState({ editModal: false });
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  handleIngredientChange(e) {
    const ingredients = e.target.value;
    this.setState({ ingredients });
  }
  addRecipe() {
    const recipe = { name: this.state.name, ingredients: this.state.ingredients };
    this.setState({
      recipes: this.state.recipes.concat(recipe),
      name: '',
      ingredients: '',
    });
    this.close();
  }
  editRecipe() {
    const idx = this.state.index;
    const recipe = { name: this.state.name, ingredients: this.state.ingredients };
    const editedRecipes = this.state.recipes
      .slice(0, idx)
      .concat(recipe)
      .concat(this.state.recipes.slice(idx+1));
    this.setState({ recipes: editedRecipes });

    this.closeEdit();
  }
  deleteRecipe(idx) {
    const newRecipes = this.state.recipes
      .slice(0, idx)
      .concat(this.state.recipes.slice(idx+1));
    this.setState({ recipes: newRecipes });
  }

  render() {
    return (
      <div>
        <EditRecipe
          editModal={this.state.editModal}
          closeEdit={this.closeEdit}
          name={this.state.name}
          ingredients={this.state.ingredients}
          handleNameChange={this.handleNameChange}
          handleIngredientChange={this.handleIngredientChange}
          editRecipe={this.editRecipe}
        />
        <Recipes
          recipes={this.state.recipes}
          editRecipe={this.editRecipe}
          deleteRecipe={this.deleteRecipe}
          openEdit={this.openEdit}
        />

        <Button onClick={this.open}>Add Recipe</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="formForRecipe">
                <ControlLabel>Recipe</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Recipe name"
                  onChange={this.handleNameChange}
                />
                <ControlLabel>Ingredients</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.ingredients}
                  placeholder="Enter ingredients, seperated, by, Commas"
                  onChange={this.handleIngredientChange}
                />
                <Button onClick={this.close} className="pull-right">Close</Button>
                <Button onClick={this.addRecipe} className="pull-right">Add Recipe</Button>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default RecipeModal;
