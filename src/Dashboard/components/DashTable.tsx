import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { IProudct } from "../../Interface";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Alert from "../../Components/UI/Alert";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useCreateProudctDashMutation,
  useDeleteProudctDashMutation,
  useUpdateProudctDashMutation,
} from "../../redux/dashboard/Api/ApiSlice";
import ModelDash from "./ModelDash";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAdd } from "../../validation";
import ErrorMsg from "../../Components/UI/ErrorMsg";

interface IProps {
  details: IProudct[];
}
function DashTable({ details }: IProps) {
  /* useDisclosure */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: openModel,
    onOpen: onOpenModel,
    onClose: onCloeModel,
  } = useDisclosure();
  const {
    isOpen: openAddModel,
    onOpen: onOpenAddModel,
    onClose: onCloeAddModel,
  } = useDisclosure();

  /*useState  */
  const [idDetail, setId] = useState<number | null>(null);
  const [dataEdit, setDataEdit] = useState<IProudct>({
    id: 0,
    attributes: {
      descrption: "",
      createdAt: "",
      category: {
        data: {
          id: 0,
          attributes: { title: "", createdAt: "" },
        },
      },
      price: 0,
      stock: 0,
      title: "",
      thumbnail: {
        data: {
          id: 0,
          attributes: { url: "", name: "" },
        },
      },
    },
  });
  const [thumbnail, setThumbnail] = useState<FileList | null>(null);
  const [thumbnailAdd, setThumbnailAdd] = useState<FileList | null>(null);
  /* ApiSlice */
  const [destroyProudct, { isLoading, isSuccess }] =
    useDeleteProudctDashMutation();

  const [
    updateProudct,
    { isLoading: loadingUpdate, isSuccess: successUpdate },
  ] = useUpdateProudctDashMutation();

  const [createProudct, { isLoading: loadCreate, isSuccess: succesCreate }] =
    useCreateProudctDashMutation();
  /* Delete */
  function handleDelte(id: number) {
    onOpen();
    setId(id);
  }
  /* Update */
  function handleUpdate(el: IProudct) {
    onOpenModel();
    setId(el.id);
    setDataEdit(el);
  }

  function handleChangeInputs(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setDataEdit({
      ...dataEdit,
      attributes: {
        ...dataEdit.attributes,
        [name]: value,
      },
    });
  }
  function handleChangeInputsNum(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setDataEdit({
      ...dataEdit,
      attributes: {
        ...dataEdit.attributes,
        [name]: +value,
      },
    });
  }
  function handleChangeThumbnail(e: ChangeEvent<HTMLInputElement>) {
    setThumbnail(e.target.files);
  }
  function updateSubmit() {
    console.log(thumbnail);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: dataEdit.attributes.title,
        descrption: dataEdit.attributes.descrption,
        price: dataEdit.attributes.price,
        stock: dataEdit.attributes.stock,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail[0]);
    }
    updateProudct({ id: idDetail, body: formData });
  }

  /* Add */
  function handleAdd() {
    onOpenAddModel();
  }
  function handleChangeThumbnailAdd(e: ChangeEvent<HTMLInputElement>) {
    setThumbnailAdd(e.target.files);
  }
  interface IFormAdd {
    title: string;
    descrption: string;
    price: number;
    stock: number;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormAdd>({ resolver: yupResolver(schemaAdd) });
  const onSubmit: SubmitHandler<IFormAdd> = async (data) => {
    console.log(data);
    console.log(thumbnailAdd);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        descrption: data.descrption,
        price: data.price,
        stock: data.stock,
      })
    );
    if (thumbnailAdd) {
      formData.append("files.thumbnail", thumbnailAdd[0]);
    }
    createProudct(formData);
  };

  /*  */
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setId(null);
    }
    if (successUpdate) {
      onCloeModel();
      setId(null);
    }
    if (succesCreate) {
      onCloeAddModel();
      reset();
    }
  }, [isSuccess, successUpdate, succesCreate, reset]);
  return (
    <>
      <Flex maxW={"85%"} mx={"auto"} direction={"column"} my={5}>
        <Button
          colorScheme="blue"
          w={"fit"}
          ml={"auto"}
          onClick={() => handleAdd()}
        >
          Add Proudct
        </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Total Enteries: {details.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {details.map((el: IProudct) => (
                <Tr key={el.id}>
                  <Td>{el.id}</Td>
                  <Td>{el.attributes.title}</Td>
                  <Td>{el.attributes.category.data?.attributes.title}</Td>
                  <Td>
                    <Image
                      src={`${el.attributes.thumbnail.data?.attributes.url}`}
                      alt={`${el.attributes.thumbnail.data?.attributes.name}`}
                      boxSize={"50px"}
                      borderRadius={"full"}
                      objectFit={"cover"}
                    />
                  </Td>
                  <Td>{el.attributes.price}</Td>
                  <Td>{el.attributes.stock}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button
                        colorScheme="purple"
                        variant={"solid"}
                        as={Link}
                        to={`/productDetails/${el.id}`}
                      >
                        <Eye />
                      </Button>
                      <Button
                        colorScheme="red"
                        bg={"red"}
                        color={"white"}
                        onClick={() => handleDelte(el.id)}
                      >
                        <Trash2 />
                      </Button>
                      <Button
                        colorScheme="blue"
                        bg={"blue"}
                        color={"white"}
                        onClick={() => handleUpdate(el)}
                      >
                        <Pencil />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Thumbnail</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>

      {isOpen && (
        <Alert
          isOpen={isOpen}
          onClose={onClose}
          title="Are You Sure?"
          descrption={"Do You Really Want To Destroy This Proudct?"}
          yesTxt="Destroy"
          isLoading={isLoading}
          onHandler={() => destroyProudct(idDetail)}
        />
      )}
      {openModel && (
        <ModelDash
          isOpen={openModel}
          onClose={onCloeModel}
          title="Proudct Update"
          isLoading={loadingUpdate}
          onHandler={updateSubmit}
          yesTxt="Update"
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Proudct Title"
              value={dataEdit.attributes.title}
              name="title"
              onChange={(e) => handleChangeInputs(e)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Descrption</FormLabel>
            <Input
              placeholder="Descrption"
              value={dataEdit.attributes.descrption}
              name="descrption"
              onChange={(e) => handleChangeInputs(e)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Price"
              onChange={(e) => handleChangeInputsNum(e)}
              value={dataEdit.attributes.price}
              name="price"
              type="number"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Stock</FormLabel>
            <Input
              placeholder="Stock"
              name="stock"
              onChange={(e) => handleChangeInputsNum(e)}
              value={dataEdit.attributes.stock}
              type="number"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              p={2}
              h={"full"}
              placeholder="thumbnail"
              name="thumbnail"
              onChange={(e) => handleChangeThumbnail(e)}
            />
          </FormControl>
        </ModelDash>
      )}
      {openAddModel && (
        <ModelDash
          isOpen={openAddModel}
          onClose={onCloeAddModel}
          title="Add Proudct"
          onHandler={handleSubmit(onSubmit)}
          isLoading={loadCreate}
          yesTxt={"Add"}
        >
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Proudct Title"
                {...register("title", { required: true, minLength: 5 })}
              />
              {errors.title && <ErrorMsg msg={`${errors.title.message}`} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Descrption</FormLabel>
              <Input
                placeholder="Descrption"
                {...register("descrption", { required: true, minLength: 5 })}
              />
              {errors.descrption && (
                <ErrorMsg msg={`${errors.descrption.message}`} />
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                placeholder="Price"
                type="number"
                {...register("price", { required: true, minLength: 2 })}
              />
              {errors.price && <ErrorMsg msg={`${errors.price.message}`} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                placeholder="Stock"
                type="number"
                {...register("stock", { required: true, minLength: 2 })}
              />
              {errors.stock && <ErrorMsg msg={`${errors.stock.message}`} />}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Thumbnail</FormLabel>
              <Input
                type="file"
                p={2}
                h={"full"}
                placeholder="thumbnail"
                name="thumbnailadd"
                onChange={(e) => handleChangeThumbnailAdd(e)}
              />
              {!thumbnailAdd && <ErrorMsg msg={`Add Photo Plase`} />}
            </FormControl>
          </Box>
        </ModelDash>
      )}
    </>
  );
}

export default DashTable;

/* import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { IProudct } from "../../Interface";
import { SERVER_URL } from "../../config";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Alert from "../../Components/UI/Alert";
import { ChangeEvent, useEffect, useState } from "react";
import {
  useDeleteProudctMutation,
  useUpdateProudctMutation,
} from "../../redux/dashboard/Api/ApiSlice";
import ModelDash from "./ModelDash";
interface IProps {
  details: IProudct[];
}
function DashTable({ details }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: openModel,
    onOpen: onOpenModel,
    onClose: onCloseModel,
  } = useDisclosure();
  const [delid, setDelid] = useState<number | null>(null);
  const [destroyProudct, { isLoading, isSuccess }] = useDeleteProudctMutation();
  const [updateProudct, { isLoading: loadupdate, isSuccess: succesUpdate }] =
    useUpdateProudctMutation();
  const [thumbnail, setThumbnail] = useState<FileList | null>(null);

  const [dataEdit, setDataEdit] = useState<IProudct>({
    id: 0,
    attributes: {
      descrption: "",
      createdAt: "",
      category: {
        data: {
          id: 0,
          attributes: { title: "", createdAt: "" },
        },
      },
      price: 0,
      stock: 0,
      title: "",
      thumbnail: {
        data: {
          id: 0,
          attributes: { url: "", name: "" },
        },
      },
    },
  });
  function hadleOpenEdit(el: IProudct) {
    onOpenModel();
    setDataEdit(el);
    setDelid(el.id);
  }
  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;
    setDataEdit({
      ...dataEdit,
      attributes: {
        ...dataEdit.attributes,
        [name]: value,
      },
    });
  }
  function handleStockandNumber(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setDataEdit({
      ...dataEdit,
      attributes: {
        ...dataEdit.attributes,
        [name]: +value,
      },
    });
  }
  function handleThumbnail(e: ChangeEvent<HTMLInputElement>) {
    setThumbnail(e.target.files);
  }
  function updateSubmit() {
    console.log(dataEdit);
    console.log(thumbnail);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: dataEdit.attributes.title,
        price: dataEdit.attributes.price,
        stock: dataEdit.attributes.stock,
        descrption: dataEdit.attributes.descrption,
      })
    );
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail[0]);
    }
    updateProudct({ id: delid, body: formData });
  }
  function handleIDdel(id: number | null) {
    setDelid(id);
    onOpen();
  }
  useEffect(() => {
    if (isSuccess) {
      setDelid(null);
      onClose();
    }
    if (succesUpdate) {
      setDelid(null);
      onCloseModel();
    }
  }, [isSuccess, succesUpdate]);
  return (
    <>
      <TableContainer maxW={"85%"} mx={"auto"}>
        <Table variant="simple">
          <TableCaption>Total Enteries: {details.length}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {details.map((el: IProudct) => (
              <Tr key={el.id}>
                <Td>{el.id}</Td>
                <Td>{el.attributes.title}</Td>
                <Td>{el.attributes.category.data?.attributes.title}</Td>
                <Td>
                  <Image
                    src={`${SERVER_URL}${el.attributes.thumbnail.data?.attributes.url}`}
                    alt={`${el.attributes.thumbnail.data?.attributes.name}`}
                    boxSize={"50px"}
                    borderRadius={"full"}
                    objectFit={"cover"}
                  />
                </Td>
                <Td>{el.attributes.price}</Td>
                <Td>{el.attributes.stock}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      colorScheme="purple"
                      variant={"solid"}
                      as={Link}
                      to={`/productDetails/${el.id}`}
                    >
                      <Eye />
                    </Button>
                    <Button
                      colorScheme="red"
                      bg={"red"}
                      color={"white"}
                      onClick={() => handleIDdel(el.id)}
                    >
                      <Trash2 />
                    </Button>
                    <Button
                      colorScheme="blue"
                      bg={"blue"}
                      color={"white"}
                      onClick={() => hadleOpenEdit(el)}
                    >
                      <Pencil />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {isOpen && (
        <Alert
          isOpen={isOpen}
          onClose={onClose}
          title="Are You Sure?"
          descrption={"Do You Really Want To Destroy This Proudct?"}
          yesTxt="Destroy"
          onHandler={() => destroyProudct(delid)}
          isLoading={isLoading}
        />
      )}

      {openModel && (
        <ModelDash
          isOpen={openModel}
          onClose={onCloseModel}
          title="Proudct Update"
          onHandler={updateSubmit}
          isLoading={loadupdate}
        >
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Proudct Title"
              name="title"
              value={dataEdit.attributes.title}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <FormControl mt={4}>
            <Text mb="8px">Desrption</Text>
            <Textarea
              value={dataEdit.attributes.descrption}
              name="descrption"
              onChange={(e) => handleChange(e)}
              placeholder="Here is a sample placeholder"
              size="sm"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              placeholder="Price "
              name="price"
              value={dataEdit.attributes.price}
              onChange={(e) => handleStockandNumber(e)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Count Stock</FormLabel>
            <Input
              type="number"
              placeholder="Stock"
              name="stock"
              value={dataEdit.attributes.stock}
              onChange={(e) => handleStockandNumber(e)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              p={2}
              h={"full"}
              placeholder="thumbnail"
              name="thumbnail"
              onChange={(e) => handleThumbnail(e)}
            />
          </FormControl>
        </ModelDash>
      )}
    </>
  );
}

export default DashTable;
 */
