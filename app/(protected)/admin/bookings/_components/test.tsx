import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

// Schema
const itemSchema = z.object({
  name: z.string().min(1, "Item Name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(1, "Price must be greater than 0"),
});

const formSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Contact is required"),
  bookingStatus: z.string().min(1, "Booking Status is required"),
  remarks: z.string().optional(),
  itemsPurchased: z.array(itemSchema).min(1, "At least one item must be added"),
});

const BookingEditPage = () => {
  const [items, setItems] = useState<
    { name: string; quantity: number; price: number }[]
  >([]);

  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      bookingStatus: "",
      remarks: "",
      itemsPurchased: [],
    },
  });

  // Handle adding an item to the list
  const handleAddItem = () => {
    if (itemName && itemQuantity > 0 && itemPrice > 0) {
      const newItem = {
        name: itemName,
        quantity: itemQuantity,
        price: itemPrice,
      };
      setItems([...items, newItem]);
      setItemName("");
      setItemQuantity(0);
      setItemPrice(0);
      form.setValue("itemsPurchased", [...items, newItem]); // Update form value
    }
  };

  // Handle deleting an item from the list
  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    form.setValue("itemsPurchased", updatedItems); // Update form value
  };

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    console.log("Purchased items:", items);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Edit Booking</h1>

      {/* Form for booking details */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Full Name"
          {...form.register("name")}
          error={!!form.formState.errors.name}
          helperText={form.formState.errors.name?.message}
          fullWidth
        />
        <TextField
          label="Phone"
          {...form.register("phone")}
          error={!!form.formState.errors.phone}
          helperText={form.formState.errors.phone?.message}
          fullWidth
        />
        <TextField
          label="Booking Status"
          {...form.register("bookingStatus")}
          error={!!form.formState.errors.bookingStatus}
          helperText={form.formState.errors.bookingStatus?.message}
          fullWidth
        />
        <TextField
          label="Remarks"
          {...form.register("remarks")}
          fullWidth
          multiline
        />

        {/* Add Items Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Items Purchased</h2>
          <div className="flex gap-4">
            <TextField
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Quantity"
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>

          {/* Display the list of items in a table */}
          {items.length > 0 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteItem(index)}
                      >
                        delete
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Display validation error if no items are added */}
          {form.formState.errors.itemsPurchased && (
            <p style={{ color: "red" }}>
              {form.formState.errors.itemsPurchased?.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BookingEditPage;
