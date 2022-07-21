/* eslint-disable react/jsx-props-no-spreading */
import React, { SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { FileRejection, ErrorCode } from 'react-dropzone';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  if (status.accepted) {
    return theme.colors[theme.primaryColor][
      theme.colorScheme === 'dark' ? 4 : 6
    ];
  }
  if (status.rejected) {
    return theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6];
  }

  if (theme.colorScheme === 'dark') {
    return theme.colors.dark[0];
  }

  return theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  fileSize: number
) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 180, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline className="text-center">
        Arrastre las imágenes aquí o haga clic para seleccionar archivos.
      </Text>
      <Text size="sm" color="dimmed" inline mt={7} className="text-center">
        Adjunte el archivo que desea subir, el cual no debe exceder los{' '}
        {fileSize}MB
      </Text>
    </div>
  </Group>
);

type Props = {
  setFile(value: SetStateAction<File | null | undefined>): void;
  setPreview(value: SetStateAction<string>): void;
};

export default function CustomImageDropzone({ setFile, setPreview }: Props) {
  const theme = useMantineTheme();
  const maxSize = 3; // Size in MB

  const readFile = (readerFile: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setPreview(e.target.result);
      }
    };

    reader.readAsDataURL(readerFile);
  };

  const onRejectHandled = (files: FileRejection[]): void => {
    files.forEach((item) => {
      const { file, errors } = item;
      const baseMessage = `El archivo ${file.name}`;

      errors.forEach((errorItem) => {
        const { code } = errorItem;
        let message: string = `${baseMessage} `;

        switch (code) {
          case ErrorCode.FileTooLarge:
            message += `es mayor que ${maxSize} MB.`;
            break;
          case ErrorCode.FileInvalidType:
            message += 'tiene un formato inválido.';
            break;
          default:
            message += 'no pudo ser cargado.';
            break;
        }

        toast.error(message);
      });
    });
  };

  const onDropHandled = (files: File[]): void => {
    setFile(files[0]);
    readFile(files[0]);
  };

  return (
    <Dropzone
      onDrop={onDropHandled}
      onReject={onRejectHandled}
      maxSize={maxSize * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      radius="xs"
    >
      {(status) => dropzoneChildren(status, theme, maxSize)}
    </Dropzone>
  );
}
